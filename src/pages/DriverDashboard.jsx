import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/APS_LOGO.png';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const DriverDashboard = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  const loc = useLocation();
  const driver = loc.state?.user;
  const email = driver?.email;

  const lastUpdateRef = useRef(0);

  const updateDriverLocation = async (email, lat, lng) => {
    try {
      const q = query(
        collection(db, "drivers"),
        where("email", "==", email)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;

        await updateDoc(docRef, {
          latitude: lat.toString(),
          longitude: lng.toString(),
        });

        console.log("UPDATED:", lat, lng);
      } else {
        console.log("Driver not found");
      }
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });

        const now = Date.now();

        if (email && now - lastUpdateRef.current > 5000) {
          lastUpdateRef.current = now;
          updateDriverLocation(email, lat, lng);
        }
      },
      (err) => {
        setError(`Error retrieving location: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [email]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8 text-center">
          <img className="w-20 h-20 absolute left-10" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold text-gray-800">Driver Dashboard</h1>
        </header>

        <div className="bg-white p-2 rounded-2xl shadow-lg mb-6 overflow-hidden">
          {location.lat && location.lng ? (
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
              <iframe
                title="Driver Location"
                className="absolute inset-0 w-full h-full border-0"
                src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="h-80 w-full flex items-center justify-center bg-gray-200 rounded-xl">
              {error ? (
                <p className="text-red-500 font-medium">{error}</p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600 animate-pulse">Fetching GPS coordinates...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Driver Profile</h2>
              <p className="text-sm text-gray-400">Assigned Vehicle Information</p>
            </div>
            <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200">
              Active / On Duty
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoField label="Driver Name" value={driver?.name} />
            <InfoField label="Driver ID" value={driver?.driverId} />
            <InfoField label="Vehicle Model" value={driver?.vehicleModel} />
            <InfoField label="License Plate" value={driver?.vehicleNumber} />
            <InfoField label="Route" value={driver?.route} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Current Lat/Long</span>
              <span className="text-sm font-mono text-blue-600">
                {location.lat ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Waiting..."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-lg font-semibold text-gray-700">{value}</span>
  </div>
);

export default DriverDashboard;