import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Layout } from "../Layout";
import { Profile } from "../pages/Profile";
import { Weather } from "../pages/Weather";
import { Map } from "../pages/Map";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Profile />
            },
            {
                path: "weather",
                element: <Weather />
            },
            {
                path: "map",
                element: <Map />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])