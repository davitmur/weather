import { configureStore } from "@reduxjs/toolkit";
import { countryApiSlice } from "../features/country/countryApiSlice.ts";
import { cordinatesApiSlice } from "../features/cordinates/cordinatesApiSlice.ts";
import { cityApiSlice } from "../features/city/cityApiSlice.ts";
import { weatherApiSlice } from "../features/weather/weatherApiSlice.ts";
import { locationApiSlice } from "../features/location/locationApiSlice.ts";

export const store = configureStore({
  reducer: {
    [cityApiSlice.reducerPath]: cityApiSlice.reducer,
    [countryApiSlice.reducerPath]: countryApiSlice.reducer,
    [cordinatesApiSlice.reducerPath]: cordinatesApiSlice.reducer,
    [weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
    [locationApiSlice.reducerPath]: locationApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        cityApiSlice.middleware,
        countryApiSlice.middleware,
        cordinatesApiSlice.middleware,
        weatherApiSlice.middleware,
        locationApiSlice.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
