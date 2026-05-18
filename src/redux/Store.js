import { configureStore } from "@reduxjs/toolkit";

// slices
import cartReducer from "./cartbilling/CartSlice";
// RTK Query APIs
import { AuthApi } from "./api/AuthApi";
export const store = configureStore({
  reducer: {
    // normal slices
    cart: cartReducer,

    // RTK Query reducers
    [AuthApi.reducerPath]: AuthApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});