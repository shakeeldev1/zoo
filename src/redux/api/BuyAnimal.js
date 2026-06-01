import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const buyAnimalApi = createApi({
  reducerPath: "buyAnimalApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v4/api/buy-animals",

    credentials: "include",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["BuyAnimal", "Animal"],

  endpoints: (builder) => ({
    getBuyAnimals: builder.query({
      query: () => ({
        url: "/getbuyanimal",
        method: "GET",
      }),

      providesTags: ["BuyAnimal"],
    }),

    getAllBuyAnimals: builder.query({
      query: () => ({
        url: "/getallbuyanimal",
        method: "GET",
      }),
      providesTags: ["BuyAnimal"],
    }),

    addBuyAnimal: builder.mutation({
      query: ({ animalId, cartQty }) => ({
        url: `/buyanimal/${animalId}`,
        method: "POST",
        body: { cartQty },
      }),

      invalidatesTags: ["BuyAnimal", "Animal"],
    }),

    deleteBuyAnimal: builder.mutation({
      query: (id) => ({
        url: `/deletebuyanimal/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["BuyAnimal", "Animal"],
    }),

    increaseBuyAnimalQty: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/increasebuyanimalqty/${id}`,
        method: "PUT",
        body: { quantity },
      }),

      invalidatesTags: ["BuyAnimal", "Animal"],
    }),

    decreaseBuyAnimalQty: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/decreasebuyanimalqty/${id}`,
        method: "PUT",
        body: { quantity },
      }),

      invalidatesTags: ["BuyAnimal", "Animal"],
    }),
  }),
});

export const {
  useGetBuyAnimalsQuery,
  useAddBuyAnimalMutation,
  useDeleteBuyAnimalMutation,
  useIncreaseBuyAnimalQtyMutation,
  useDecreaseBuyAnimalQtyMutation,
  useGetAllBuyAnimalsQuery,
} = buyAnimalApi;

export default buyAnimalApi;