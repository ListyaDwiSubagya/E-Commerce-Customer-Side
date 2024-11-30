import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: {}, 
    subtotal: 0, 
  };
  
  const calculateSubtotal = (cartItems) => {
    return Object.values(cartItems).reduce((total, product) => {
      return total + Object.values(product).reduce((sub, qty) => sub + qty.price * qty.quantity, 0);
    }, 0);
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const { productId, size, quantity, price } = action.payload;
        if (!state.cartItems[productId]) {
          state.cartItems[productId] = {};
        }
        state.cartItems[productId][size] = 
          (state.cartItems[productId][size] || 0) + quantity;
        state.subtotal = calculateSubtotal(state.cartItems); 
      },
      updateCart: (state, action) => {
        const { productId, size, quantity, price } = action.payload;
        if (quantity === 0) {
          delete state.cartItems[productId][size];
          if (Object.keys(state.cartItems[productId]).length === 0) {
            delete state.cartItems[productId];
          }
        } else {
          state.cartItems[productId][size] = quantity;
        }
        state.subtotal = calculateSubtotal(state.cartItems); 
      },
      clearCart: (state) => {
        state.cartItems = {};
        state.subtotal = 0; 
      },
    },
  });
  

export const { addToCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
