import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
    //   keepUnusedDataFor: 5, // [ses]- how long to keep cached data in the store after the last subscriber stops using it.
    }),
    getVideo: builder.query({
        query: (id)=> `/videos/${id}`
    })
  }),
});

export const {useGetVideosQuery, useGetVideoQuery} = apiSlice;
