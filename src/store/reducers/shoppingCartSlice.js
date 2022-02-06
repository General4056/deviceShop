import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shoppingCartItems: []
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.shoppingCartItems.push(action.payload);
    },

    deleteFromCart(state, action) {
      state.shoppingCartItems = state.shoppingCartItems.filter((item) => item.id !== action.payload.id);
    },

    changeQuantity(state, action) {
      const index = state.shoppingCartItems.findIndex((item) => item.id === action.payload.id);
      if (!state.shoppingCartItems[index].quantity) {
        state.shoppingCartItems[index].quantity = action.payload.value;
      } else {
        state.shoppingCartItems[index].quantity += action.payload.value;
      }
    }
  }
});

export const { addToCart, changeQuantity, deleteFromCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
