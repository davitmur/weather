import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICordinates } from "../../type";

export const cordinatesApiSlice = createApi({
  reducerPath: "cordinates",
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid=36c7c28350e9a603b7cfdd846f9bab15" }),
//   baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/geo/1.0/zip?lat=44.34&lon=10.99&appid=36c7c28350e9a603b7cfdd846f9bab15" }),
  tagTypes: ["cordinates"],
  endpoints: (build) => ({
      getCordinates: build.query<ICordinates, void>({
          query: () => "",
          providesTags: ["cordinates"],
        }),
    }),
});

export const { useGetCordinatesQuery } = cordinatesApiSlice;

