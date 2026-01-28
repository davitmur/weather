import React, { useEffect, useState } from "react";
import "./style.scss";
import { Map } from "../Map";
import type { ILocation } from "../../type";
import { useGetWeatherQuery } from "../../features/weather/weatherApiSlice";
import { useGetLocationQuery } from "../../features/location/locationApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";


export const Profile: React.FC = React.memo(() => {
    const { data: location } = useGetLocationQuery();
    const { data: weather } = useGetWeatherQuery(location ? { lat: location.latitude, lon: location.longitude } : skipToken);
    const weatherToday = weather?.list?.slice(0, 8) ?? [];
    const weatherNow = weatherToday[0];

    const date = weatherNow?.dt ? new Date(weatherNow.dt * 1000) : undefined;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekDay = date ? days[date?.getDay()] : undefined;
    const temp_min = weatherToday.length ? Math.round(weatherToday?.reduce((a, b) => a.main.temp_min < b.main.temp_min ? a : b).main.temp_min - 273.15) : undefined;
    const temp_max = weatherToday.length ? Math.round(weatherToday?.reduce((a, b) => a.main.temp_max > b.main.temp_max ? a : b).main.temp_max - 273.15) : undefined;
    const sunriseTime = weather ? new Date(weather.city.sunrise * 1000) : undefined;
    const sunsetTime = weather ? new Date(weather.city.sunset * 1000) : undefined;

    const [locations, setLocations] = useState<ILocation[]>(() => {
        return JSON.parse(localStorage.getItem("locations") || "[]");
    });

    useEffect(() => {
        const handleStorageUpdate = () => {
            setLocations(JSON.parse(localStorage.getItem("locations") || "[]"));
        };

        window.addEventListener("localStorageUpdated", handleStorageUpdate);

        return () => window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    }, []);


    // console.log(location);
    return (<div className="profile">
        {/* <Location /> */}
        <div className="div1">
            <input className="inp1" type="text" placeholder="search city..." />
            <div className="div1Div1">
                <img src={`https://openweathermap.org/img/wn/${weatherNow?.weather[0].icon}@2x.png`} alt="Anun" className="anun" />
                <p>{weatherNow ? Math.round(weatherNow.main.temp - 273.15) : ""}°C</p>
                <div>
                    <p>{weather?.city.name}</p>
                    <p>{weekDay}</p>
                </div>
            </div>
            <div className="div1Div2">
                <div>
                    <img src="./images/Cloud Rain.png" alt="Cloud Rain" className="cloudRain" />
                    {/* --------------------rain--------------- */}
                    <p>{weatherNow ? weatherNow.weather[0].description : ""}</p>
                </div>
                <div>
                    <img src="./images/Temperature 01.png" alt="Temperature 01" className="temperature01" />
                    <p>Min Temperature - ({temp_min}°C)</p>
                </div>
                <div>
                    <img src="./images/Temperature 02.png" alt="Temperature 02" className="temperature02" />
                    <p>Max Temperature - ({temp_max}°C)</p>
                </div>
            </div>
            <div className="div1Div3">
                <div className="div1Div3Div1">
                    <img src="./images/water.png" alt="Water" className="water" />
                    <div>
                        <h3>{weatherNow?.main.humidity}%</h3>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="div1Div3Div2">
                    <img src="./images/wind.png" alt="Wind" className="wind" />
                    <div>
                        <h3>{Math.round(weatherNow?.wind.speed * 3.6)}km/h</h3>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="div2">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="pill" href="#today">Today</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="pill" href="#5days">Next 4 days</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="pill" href="#map">Map</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane container active" id="today">
                    <div className="div2Div2">
                        {
                            weatherToday?.map((elm, index) => {
                                const time = new Date(elm.dt * 1000);
                                return (<div className="div2Div2Divs" key={index}>
                                    <p>{time.getHours()}:00</p>
                                    <img src={`https://openweathermap.org/img/wn/${elm.weather[0].icon}@2x.png`} alt="" />
                                    <p>{Math.round(elm.main.temp - 273.15)}°</p>
                                </div>)
                            })
                        }
                    </div>
                    <p className="div2P">Today’s Overview</p>
                    <div className="div2Div3">
                        <div className="div2Div3Div1">
                            <p>Air Quality Index</p>
                            <div className="div2Div3Div1Div">
                                <div className="div2Div3Div1DivDiv1">
                                    <h2>Number</h2>
                                    <p>text</p>
                                </div>
                                <div className="div2Div3img">
                                    <img src="./images/air-pollution.png" alt="Air-pollution" className="air-pollution" />
                                </div>
                            </div>
                        </div>
                        <div className="div2Div3Div2">
                            <p>UV Index</p>
                            <div className="div2Div3Div2Div">
                                <div className="div2Div3Div2DivDiv1">
                                    <h2>Number</h2>
                                    <p>text</p>
                                </div>
                                <div className="div2Div3img">
                                    <img src="./images/uv.png" alt="Uv" className="uv" />
                                </div>
                            </div>
                        </div>
                        <div className="div2Div3Div3">
                            <p>Pressure (hpa)</p>
                            <div className="div2Div3Div3Div">
                                <div className="div2Div3Div3DivDiv1">
                                    <h2>{weatherNow?.main.pressure}</h2>
                                    <p>text</p>
                                </div>
                                <div className="div2Div3img">
                                    <img src="./images/barometer.png" alt="Barometer" className="barometer" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="div2Div4">
                        <div className="div2Div4Div1">
                            {
                                locations.map((elm, index) => {
                                    return (<div className="div2Div4DIv1Divs" key={index}>
                                        <h2>{elm.name}</h2>
                                    </div>)
                                })
                            }
                        </div>
                        <div className="div2Div4Div2">
                            <p>Sunrise & Sunset</p>
                            <div>
                                <img src="./images/Sunrise.png" alt="Sunrise" className="sunrise" />
                                <div>
                                    <p className="div2Div4Div2DivP1">Sunrise</p>
                                    <p>{sunriseTime ? sunriseTime?.getHours() : ""}:{sunriseTime ? sunriseTime?.getMinutes() : ""}</p>
                                </div>
                            </div>
                            <div>
                                <img src="./images/Sunset.png" alt="Sunset" className="sunset" />
                                <div>
                                    <p className="div2Div4Div2DivP1">Sunset</p>
                                    <p>{sunsetTime ? sunsetTime?.getHours() : ""}:{sunsetTime ? sunsetTime?.getMinutes() : ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane container fade" id="5days">...</div>
                <div className="tab-pane container fade" id="map">
                    <div>
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    </div>)
})