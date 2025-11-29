import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
//import orderReducer from "./orderSlice";
import authReducer from "./authSlice";
import wishlistReducer from "./wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    //orders: orderReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});