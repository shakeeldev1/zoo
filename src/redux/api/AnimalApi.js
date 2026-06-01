import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const animalApi = createApi({
  reducerPath: "animalApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/v3/api/animal",
    credentials: "include",

    prepareHeaders: (headers) => {

      // ✅ Get token from localStorage
      const token = localStorage.getItem("token");

      // ✅ Add Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      // ❌ DO NOT SET CONTENT-TYPE HERE
      // Browser automatically handles multipart/form-data

      return headers;
    },
  }),

  // ✅ Tags
  tagTypes: ["Animals"],

  endpoints: (builder) => ({

    // ================= GET ALL ANIMALS =================
    getAllAnimals: builder.query({
      query: () => ({
        url: "/getallanimal",
        method: "GET",
      }),

      providesTags: ["Animals"],
    }),

    // ================= CREATE ANIMAL =================
    createAnimal: builder.mutation({
      query: (formData) => ({
        url: "/createanimal",
        method: "POST",

        // ✅ FormData directly
        body: formData,
      }),

      invalidatesTags: ["Animals"],
    }),

    // ================= UPDATE ANIMAL =================
    updateAnimal: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/updateanimal/${id}`,
        method: "PUT",

        // ✅ FormData directly
        body: formData,
      }),

      invalidatesTags: ["Animals"],
    }),

    // ================= DELETE ANIMAL =================
    deleteAnimal: builder.mutation({
      query: (id) => ({
        url: `/deleteanimal/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Animals"],
    }),

  }),
});

// ================= EXPORT HOOKS =================
export const {
  useGetAllAnimalsQuery,
  useCreateAnimalMutation,
  useUpdateAnimalMutation,
  useDeleteAnimalMutation,
} = animalApi;

// ================= EXPORT API =================
export default animalApi;