import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICity } from "../../type";

export const cityApiSlice = createApi({
    reducerPath: "city",
    baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/geo/1.0/" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/geo/1.0/direct?reverse?lat=44.34&lon=10.99&appid=36c7c28350e9a603b7cfdd846f9bab15" }),
    // baseQuery: fetchBaseQuery({ baseUrl: "http://api.openweathermap.org/geo/1.0/direct?q=Rome&appid=36c7c28350e9a603b7cfdd846f9bab15" }),
    tagTypes: ["city"],
    endpoints: (build) => ({
        getCityByLatAndLon: build.query<ICity[], { lat: number, lon: number }>({
            query: ({ lat, lon }) => `reverse?lat=${lat}&lon=${lon}&appid=36c7c28350e9a603b7cfdd846f9bab15`,
            providesTags: ["city"],
        }),
    }),
});

export const { useGetCityByLatAndLonQuery } = cityApiSlice;
