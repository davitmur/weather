// import { useEffect, useState } from "react";

// const Location = () => {
//     const [location, setLocation] = useState<any>(null);

//     useEffect(() => {
//         fetch("https://ipapi.co/json/")
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 setLocation({
//                     latitude: data.latitude,
//                     longitude: data.longitude,
//                     timezone: data.timezone,
//                     city: data.city,
//                     country: data.country_name,
//                 });
//             })
//             .catch((err) => console.error("Error fetching location:", err));
//     }, []);

//     return (
//         <div>
//             {location ? (
//                 <>
//                     <p>Latitude: {location.latitude}</p>
//                     <p>Longitude: {location.longitude}</p>
//                     <p>Timezone: {location.timezone}</p>
//                     <p>City: {location.city}</p>
//                     <p>Country: {location.country}</p>
//                 </>
//             ) : (
//                 <p>Loading location...</p>
//             )}
//         </div>
//     );
// };

// export default Location;
