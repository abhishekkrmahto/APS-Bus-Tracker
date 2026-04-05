import React, { useEffect, useContext } from "react";
import Login from "./pages/Login";
import { LocationContext } from "./context/LocationProvider";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { latitude, longitude, setLatitude, setLongitude } =
    useContext(LocationContext);

  useEffect(() => {
    const geo = navigator.geolocation;
    console.log(navigator.geolocation)

    const userPosition = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const watchId = geo.watchPosition(userPosition);

    return () => {
      geo.clearWatch(watchId);
    };
  }, [setLatitude, setLongitude]);

  return (
    <div className="text-black">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
};

export default App;