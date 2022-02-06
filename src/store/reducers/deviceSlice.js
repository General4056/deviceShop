import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllItems, getItemsInCategory } from '../../utils/api';

const initialState = {
  deviceList: [],
  status: null,
  error: null
};

export const fetchDeviceListInCategory = createAsyncThunk(
  'deviceList/fetchDeviceListInCategory',
  async function (selectedCategory, { rejectWithValue }) {
    try {
      const response = await getItemsInCategory(selectedCategory);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchByQuery = createAsyncThunk(
  'deviceList/fetchByQuery',
  async function (searchQuery, { rejectWithValue }) {
    try {
      const response = await getAllItems();

      console.log(response);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = await response.json();

      const searchedList = data.filter((item) => {
        return item.title.toLowerCase().includes(searchQuery);
      });

      return searchedList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deviceSlice = createSlice({
  name: 'deviceList',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDeviceListInCategory.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchDeviceListInCategory.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.deviceList = action.payload;
    },
    [fetchDeviceListInCategory.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [fetchByQuery.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchByQuery.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.deviceList = action.payload;
    },
    [fetchByQuery.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export default deviceSlice.reducer;
