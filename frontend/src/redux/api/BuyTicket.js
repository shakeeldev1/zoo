import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const buyTicketApi =
  createApi({
    reducerPath: "buyTicketApi",

    baseQuery: fetchBaseQuery({
      baseUrl:
        "http://localhost:5000/v6/api/buy-tickets",

      credentials: "include",

      prepareHeaders: (
        headers
      ) => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (token) {
          headers.set(
            "Authorization",
            `Bearer ${token}`
          );
        }

        return headers;
      },
    }),

    tagTypes: [
      "BuyTicket",
      "Ticket",
    ],

    endpoints: (builder) => ({

      // ================= CREATE =================
      createBuyTicket:
        builder.mutation({
          query: ({
            ticketId,
            ticketQty,
          }) => ({
            url: `/buy-ticket/${ticketId}`,
            method: "POST",
            body: {
              ticketQty,
            },
          }),

          invalidatesTags: [
            "BuyTicket",
            "Ticket",
          ],
        }),

      // ================= GET =================
      getBuyTickets:
        builder.query({
          query: () => ({
            url: "/getbuytickets",
            method: "GET",
          }),

          providesTags: [
            "BuyTicket",
          ],
        }),

      // ================= GET BY ID =================
      getBuyTicketById:
        builder.query({
          query: (id) => ({
            url: `/getbuyticketbyid/${id}`,
            method: "GET",
          }),

          providesTags: [
            "BuyTicket",
          ],
        }),

      // ================= DELETE =================
      deleteBuyTicket:
        builder.mutation({
          query: (id) => ({
            url: `/deletebuyticket/${id}`,
            method: "DELETE",
          }),

          invalidatesTags: [
            "BuyTicket",
            "Ticket",
          ],
        }),

      // ================= INCREASE =================
      increaseBuyTicketQuantity:
        builder.mutation({
          query: ({
            id,
            quantity,
          }) => ({
            url: `/increasebuyticketquantity/${id}`,
            method: "PUT",
            body: {
              quantity,
            },
          }),

          invalidatesTags: [
            "BuyTicket",
            "Ticket",
          ],
        }),

      // ================= DECREASE =================
      decreaseBuyTicketQuantity:
        builder.mutation({
          query: ({
            id,
            quantity,
          }) => ({
            url: `/decreasebuyticketquantity/${id}`,
            method: "PUT",
            body: {
              quantity,
            },
          }),

          invalidatesTags: [
            "BuyTicket",
            "Ticket",
          ],
        }),
    }),
  });

export const {
  useCreateBuyTicketMutation,
  useGetBuyTicketsQuery,
  useGetBuyTicketByIdQuery,
  useDeleteBuyTicketMutation,
  useIncreaseBuyTicketQuantityMutation,
  useDecreaseBuyTicketQuantityMutation,
} = buyTicketApi;

export default buyTicketApi;