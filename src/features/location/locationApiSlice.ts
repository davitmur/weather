import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ILocation1 } from "../../type";

export const locationApiSlice = createApi({
  reducerPath: "location",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ipapi.co/json/" }),
  tagTypes: ["location"],
  endpoints: (build) => ({
    getLocation: build.query<ILocation1, void>({
      query: () => "",
      providesTags: ["location"],
    }),
  }),
});

export const { useGetLocationQuery } = locationApiSlice;