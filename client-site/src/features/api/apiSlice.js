import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      // keepUnusedDataFor: 25, // [ses]- how long to keep cached data in the store after the last subscriber stops using it.
      providesTags: ["Videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    //query like:  ?title_like=react&&title_like=tailwind&_limit=4
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const limit = 4;
        const tags = title?.split(" ");
        const likes = tags?.map((tag) => `title_like=${tag}`);
        const queryStirng = `/videos/?${likes.join(
          "&"
        )}&_limit=${limit}&id_ne=${id}`;
        return queryStirng;
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
        { type: "RelatedVideos", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} = apiSlice;
