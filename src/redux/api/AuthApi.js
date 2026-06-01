import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v1/api/users",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Profile"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
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

    getProfile: builder.query({
      query: () => ({
        url: "/get-profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/update-profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["Profile"],
    }),

    deleteProfile: builder.mutation({
      query: () => ({
        url: "/delete-profile",
        method: "DELETE",
      }),
      invalidatesTags: ["Profile", "User"],
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

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useDeleteUserMutation,
  useLogoutUserMutation,
  useVerifyOtpMutation,
  useGetAllUsersQuery,
  useVerifyUserQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = AuthApi;