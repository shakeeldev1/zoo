import { configureStore } from "@reduxjs/toolkit";

// slices
import cartReducer from "./cartbilling/CartSlice";
// RTK Query APIs
import { AuthApi } from "./api/AuthApi";
import reviewsApi from "./api/ReviwsApi";
import animalApi from "./api/AnimalApi";
import buyAnimalApi from "./api/BuyAnimal";
import ticketApi from "./api/TicketApi";
import buyTicketApi from "./api/BuyTicket";
export const store = configureStore({
  reducer: {
    // normal slices
    cart: cartReducer,

    // RTK Query reducers
    [AuthApi.reducerPath]: AuthApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [animalApi.reducerPath]: animalApi.reducer,
    [buyAnimalApi.reducerPath]: buyAnimalApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [buyTicketApi.reducerPath]: buyTicketApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, reviewsApi.middleware, animalApi.middleware, buyAnimalApi.middleware, ticketApi.middleware,buyTicketApi.middleware),
});