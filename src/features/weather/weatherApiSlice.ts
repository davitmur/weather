import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IWeather } from "../../type";

export const weatherApiSlice = createApi({
    reducerPath: "weather",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/data/2.5/" }),
    //   baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=985d73ef2f37aab2067fc8c7ce199154" }),
    tagTypes: ["weather"],
    endpoints: (build) => ({
        getWeather: build.query<IWeather, { lat: number, lon: number }>({
            query: ({lat, lon}) => `forecast?lat=${lat}&lon=${lon}&appid=985d73ef2f37aab2067fc8c7ce199154`, //q=Yerevan
            providesTags: ["weather"],
        }),
    }),
});

export const { useGetWeatherQuery } = weatherApiSlice;