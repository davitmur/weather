import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
import "./style.scss";

export const Menu: React.FC = React.memo(() => {
    // const pathname = useLocation().pathname;

    return (<div className="menu">
        {/* <NavLink className={`${pathname == "/" ? "active" : ""}`} to="/">Home</NavLink> */}
        {/* <NavLink className={`${pathname == "/weather" ? "active" : ""}`} to="weather">Weather</NavLink> */}
        {/* <NavLink className={`${pathname == "/map" ? "active" : ""}`} to="map">Map</NavLink> */}
    </div>)
})