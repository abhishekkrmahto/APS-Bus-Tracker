import React, { useEffect, useContext } from "react";
import Login from "./pages/Login";
import { LocationContext } from "./context/LocationProvider";
import { Route, Routes } from "react-router-dom";
import DriverDashboard from "./pages/DriverDashboard";
import MapComponent from "./components/MapComponent";
import ParentDashBoard from "./pages/ParentDashBoard";
import AdminDashboard from "./pages/AdminDashboard";

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
        <Route path="/driverDashBoard" element={<DriverDashboard/>}></Route>
        <Route path="/parentDashBoard" element={<ParentDashBoard/>}></Route>
        <Route path="/adminDashBoard" element={<AdminDashboard/>}></Route>
        <Route path="/map" element={<MapComponent/>}></Route>
      </Routes>
    </div>
  );
};

export default App;