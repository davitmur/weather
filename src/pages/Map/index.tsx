import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { useGetCityByLatAndLonQuery } from "../../features/city/cityApiSlice";
import type { ICoords, ILocation } from "../../type";

export const Map: React.FC = React.memo(() => {
    const [markers, setMarkers] = useState<ILocation[]>([]);
    const [clickedCoords, setClickedCoords] = useState<ICoords | null>(null);
    const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const saved: ILocation[] = JSON.parse(localStorage.getItem("locations") || "[]");
        setMarkers(saved);
    }, []);

    const { data: cities } = useGetCityByLatAndLonQuery(clickedCoords!, {
        skip: !clickedCoords
    });

    useEffect(() => {
        if (cities && cities.length > 0 && pendingLocation) {
            const cityName = cities[0].name;

            const exists = markers.some(elm => elm.name === cityName);

            if (exists) {
                console.log(`City "${cityName}" already exists. Nothing changed.`);
                setPendingLocation(null);
                return;
            }

            const newLocation: ILocation = {
                lat: pendingLocation.lat,
                lng: pendingLocation.lng,
                name: cityName
            };

            const updatedMarkers = [...markers, newLocation];
            setMarkers(updatedMarkers);

            localStorage.setItem("locations", JSON.stringify(updatedMarkers));

            window.dispatchEvent(new Event("localStorageUpdated"));

            setPendingLocation(null);
        }
    }, [cities, pendingLocation, markers]);

    const ClickHandler: React.FC = () => {
        useMapEvents({
            click(e) {
                setPendingLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
                setClickedCoords({ lat: e.latlng.lat, lon: e.latlng.lng });
            }
        });
        return null;
    };

    return (
        <div className="map">
            <MapContainer
                center={[51.505, -0.09]}
                // center={[40.15, 44.50]} // Yerevan
                zoom={13}
                style={{ height: "400px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ClickHandler />

                {markers.map((m) => (
                    <Marker key={m.name} position={[m.lat, m.lng]} />
                ))}
            </MapContainer>
        </div>
    );
});





// export const Map: React.FC = React.memo(() => {
//     const [position, setPosition] = useState<ILocation | null>(null);
//     const [markers, setMarkers] = useState<ILocation[]>([]);
//     const [clickedCoords, setClickedCoords] = useState<ICoords | null>(null);
//     const [pendingLocation, setPendingLocation] = useState<{ lat: number; lng: number } | null>(null);

//     useEffect(() => {
//         const saved: ILocation[] = JSON.parse(localStorage.getItem("locations") || "[]");
//         setMarkers(saved);
//     }, []);

//     const { data: cities } = useGetCityByLatAndLonQuery(clickedCoords!, {
//         skip: !clickedCoords
//     });

//     useEffect(() => {
//         if (cities && cities.length > 0 && pendingLocation) {
//             const cityName = cities[0].name;

//             const existingIndex = markers.findIndex(
//                 loc => loc.name === cityName
//             );

//             let updatedMarkers: ILocation[];

//             if (existingIndex !== -1) {
//                 updatedMarkers = markers;
//                 // updatedMarkers = markers.map((loc, index) => {
//                 //     console.log("map index:", index, "existingIndex:", existingIndex, "city:", loc.name);
//                 //     console.log({ ...loc, lat: pendingLocation.lat, lng: pendingLocation.lng });

//                 //     return (index === existingIndex
//                 //         ? { ...loc, lat: pendingLocation.lat, lng: pendingLocation.lng }
//                 //         : loc);
//                 // });
//             } else {
//                 const newLocation: ILocation = {
//                     lat: pendingLocation.lat,
//                     lng: pendingLocation.lng,
//                     name: cityName
//                 };
//                 updatedMarkers = [...markers, newLocation];
//             }

//             setMarkers(updatedMarkers);
//             setPosition({ lat: pendingLocation.lat, lng: pendingLocation.lng, name: cityName });
//             localStorage.setItem("locations", JSON.stringify(updatedMarkers));

//             window.dispatchEvent(new Event("localStorageUpdated"));

//             setPendingLocation(null);
//         }
//     }, [cities, pendingLocation, markers]);

//     const ClickHandler: React.FC = () => {
//         useMapEvents({
//             click(e) {
//                 setPendingLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
//                 setClickedCoords({ lat: e.latlng.lat, lon: e.latlng.lng });
//             }
//         });
//         return null;
//     };

//     return (
//         <div className="map">
//             <MapContainer
//                 center={[51.505, -0.09]}
//                 zoom={13}
//                 style={{ height: "400px", width: "100%" }}
//             >
//                 <TileLayer
//                     attribution='&copy; OpenStreetMap contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />

//                 <ClickHandler />

//                 {markers.map((m) => (
//                     <Marker key={m.name} position={[m.lat, m.lng]} />
//                 ))}
//             </MapContainer>
//         </div>
//     );
// });
