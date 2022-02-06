import { configureStore } from '@reduxjs/toolkit';

import deviceReducer from './reducers/deviceSlice';
import categoriesReducer from './reducers/categoriesSlice';
import shoppingCartReducer from './reducers/shoppingCartSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    categories: categoriesReducer,
    shoppingCart: shoppingCartReducer
  }
});
