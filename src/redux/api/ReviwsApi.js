import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v2/api/reviews",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }    
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  
  tagTypes: ["Reviews"],
  
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "/getreviews",
      providesTags: ["Reviews"],
    }),
    
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/createreview",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Reviews"],
    }),
    
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/deletereview/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
export default reviewsApi;