import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICountry } from "../../type";

export const countryApiSlice = createApi({
  reducerPath: "countries",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  tagTypes: ["countries"],
  endpoints: (build) => ({
    getCountries: build.query<ICountry[], void>({
      query: () => "all?fields=name",
      providesTags: ["countries"],
    }),
  }),
});

export const { useGetCountriesQuery } = countryApiSlice;