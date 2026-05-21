// src/redux/api/AuthApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v1/api/users",
    credentials: "include", // Important for cookies/auth
    prepareHeaders: (headers) => {

    headers.set("Content-Type", "application/json");

    // ================= TOKEN =================
    const token = localStorage.getItem("token");

    // ================= SEND TOKEN =================
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
}),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      // Invalidate cache if needed
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/all-users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    verifyUser: builder.query({
  query: () => ({
    url: "/verify-user",
    method: "GET",
  }),
}),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
        verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useLogoutUserMutation,
  useVerifyOtpMutation,
  useGetAllUsersQuery,
  useVerifyUserQuery,
} = AuthApi;