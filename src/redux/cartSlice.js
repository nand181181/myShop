import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: []
  },
  reducers: {
addToCart: (state, action) => {
  const existing = state.cartItems.find(item => item.id === action.payload.id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cartItems.push({ ...action.payload, qty: 1 });
  }
},
    increaseQty: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.qty += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item.qty > 1) item.qty -= 1;
      else state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
    }
  }
});

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
