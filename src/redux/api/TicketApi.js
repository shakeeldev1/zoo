import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v5/api/tickets",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Ticket"],
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (formData) => ({
        url: "/createticket",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Ticket"],
    }),

    getAllTickets: builder.query({
      query: () => ({
        url: "/gettickets",
        method: "GET",
      }),
      providesTags: ["Ticket"],
    }),

    getTicket: builder.query({
      query: (id) => ({
        url: `/getticket/${id}`,
        method: "GET",
      }),
      providesTags: ["Ticket"],
    }),

    updateTicket: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/updateticket/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Ticket"],
    }),

    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `/deleteticket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ticket"],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetAllTicketsQuery,
  useGetTicketQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;

export default ticketApi;