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
      query: (id) => `/videos/${id}`,
    }),
    //query like:  ?title_like=react&&title_like=tailwind&_limit=4
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const limit = 4;
        const tags = title?.split(" ");
        const likes = tags?.map(tag=> `title_like=${tag}`);
        const queryStirng = `/videos/?${likes.join('&')}&_limit=${limit}&id_ne=${id}`;
        return queryStirng;
      },
    }),
  }),
});

export const {useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery} = apiSlice;
