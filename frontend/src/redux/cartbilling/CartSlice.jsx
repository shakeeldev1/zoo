import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);

      if (existingItem) {
        if (existingItem.cartQuantity < item.quantity) {
          existingItem.cartQuantity += 1;
        }
      } else {
        state.cartItems.push({
          ...item,
          cartQuantity: 1
        });
      }
    },
    decreaseQty: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === itemId);
      if (existingItem) {
        if (existingItem.cartQuantity > 1) {
          existingItem.cartQuantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        }
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    }
  }
});

export const { addToCart, decreaseQty, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;