import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from '../../utils/api';

const initialState = {
  categories: [],
  selectedCategory: 'electronics',
  status: null,
  error: null
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async function (_, { rejectWithValue }) {
  try {
    const response = await getAllCategories();

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory(state, action) {
      console.log(action.payload);
      state.selectedCategory = action.payload.category;
    }
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
