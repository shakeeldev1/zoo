import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const buyAnimalApi = createApi({
  reducerPath: "buyAnimalApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v4/api/buy-animals",

    credentials: "include",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["BuyAnimal"],

  endpoints: (builder) => ({

    // ✅ GET CART ITEMS
    getBuyAnimals: builder.query({
      query: () => ({
        url: "/getbuyanimal",
        method: "GET",
      }),

      providesTags: ["BuyAnimal"],
    }),

    // ✅ ADD TO CART
 addBuyAnimal: builder.mutation({
  query: (animalId) => ({
    url: `/buyanimal/${animalId}`,
    method: "POST",
  }),

      invalidatesTags: ["BuyAnimal"],
    }),

    // ✅ DELETE CART ITEM
    deleteBuyAnimal: builder.mutation({
      query: (id) => ({
        url: `/deletebuyanimal/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["BuyAnimal"],
    }),

    // ✅ INCREASE QUANTITY
    increaseBuyAnimalQty: builder.mutation({
      query: (id) => ({
        url: `/increasebuyanimalqty/${id}`,
        method: "PUT",
      }),

      invalidatesTags: ["BuyAnimal"],
    }),

    // ✅ DECREASE QUANTITY
    decreaseBuyAnimalQty: builder.mutation({
      query: (id) => ({
        url: `/decreasebuyanimalqty/${id}`,
        method: "PUT",
      }),

      invalidatesTags: ["BuyAnimal"],
    }),

  }),
});

export const {
  useGetBuyAnimalsQuery,
  useAddBuyAnimalMutation,
  useDeleteBuyAnimalMutation,
  useIncreaseBuyAnimalQtyMutation,
  useDecreaseBuyAnimalQtyMutation,
} = buyAnimalApi;

export default buyAnimalApi;