import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: {}, 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, size, quantity } = action.payload;
      if (!state.cartItems[productId]) {
        state.cartItems[productId] = {};
      }
      state.cartItems[productId][size] = 
        (state.cartItems[productId][size] || 0) + quantity;
    },
    updateCart: (state, action) => {
      const { productId, size, quantity } = action.payload;
      if (quantity === 0) {
        delete state.cartItems[productId][size];
        if (Object.keys(state.cartItems[productId]).length === 0) {
          delete state.cartItems[productId];
        }
      } else {
        state.cartItems[productId][size] = quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
  },
});

export const { addToCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
