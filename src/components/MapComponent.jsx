import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState,useEffect } from "react";

const MapComponent = (props) => {

    const [location, setLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const handleError = (err) => {
      setError(`Error retrieving location: ${err.message}`);
    };

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);


  return (
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
  );
};

export default MapComponent;