import { configureStore } from '@reduxjs/toolkit'; 
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;
