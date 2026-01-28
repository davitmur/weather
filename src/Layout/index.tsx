import React from "react";
import { Menu } from "../components/Menu";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = React.memo(() => {
    return (<div>
        <Menu />
        <Outlet />
    </div>)
})