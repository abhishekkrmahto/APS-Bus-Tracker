import React, { useState, useEffect } from 'react';
import logo from '../assets/APS_LOGO.png'

const ParentDashBoard = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  // Mock Driver Data
  const driverDetails = {
    name: "Kuldeep Yadav",
    id: "APS-D257",
    vehicle: "TATA MAGIC",
    licensePlate: "JH-01-AH-2627",
    rating: "4.0 ⭐",
    status: "Active / On Duty",
    phone:"9988799887"
  };

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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="mb-8 text-center">
            <img className="w-20 h-20 absolute left-10" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
        </header>

        {/* Map Section */}
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

        {/* Driver Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Driver Profile</h2>
              <p className="text-sm text-gray-400">Assigned Vehicle Information</p>
            </div>
            <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200">
              {driverDetails.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoField label="Driver Name" value={driverDetails.name} />
            <InfoField label="Driver ID" value={driverDetails.id} />
            <InfoField label="Vehicle Model" value={driverDetails.vehicle} />
            <InfoField label="License Plate" value={driverDetails.licensePlate} />
            <InfoField label="Performance Rating" value={driverDetails.rating} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">CONTACT</span>
              <span className="text-sm font-mono text-blue-600">
                {/* {location.lat ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Waiting..."} */}
                {driverDetails.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for clarity
const InfoField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-lg font-semibold text-gray-700">{value}</span>
  </div>
);

export default ParentDashBoard;