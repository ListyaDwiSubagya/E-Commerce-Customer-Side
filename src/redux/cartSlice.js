import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: {}, // Struktur: { itemId: { size: quantity } }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, size } = action.payload;
      if (!size) return;

      if (state.cartItems[itemId]) {
        state.cartItems[itemId][size] = (state.cartItems[itemId][size] || 0) + 1;
      } else {
        state.cartItems[itemId] = { [size]: 1 };
      }
    },
    updateQuantity: (state, action) => {
      const { itemId, size, quantity } = action.payload;
      if (state.cartItems[itemId] && state.cartItems[itemId][size] !== undefined) {
        state.cartItems[itemId][size] = quantity;
      }
    },
    removeItem: (state, action) => {
      const { itemId, size } = action.payload;
      if (state.cartItems[itemId] && state.cartItems[itemId][size]) {
        delete state.cartItems[itemId][size];
        if (Object.keys(state.cartItems[itemId]).length === 0) {
          delete state.cartItems[itemId];
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
    },
  },
});

export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
