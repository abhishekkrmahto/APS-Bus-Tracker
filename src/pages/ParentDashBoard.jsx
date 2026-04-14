import React, { useState, useEffect } from "react";
import logo from "../assets/APS_LOGO.png";
import { useLocation } from "react-router-dom";
import {
  driverCollectionRef,
} from "../firebase/firebaseConfig";
import { query, where, onSnapshot } from "firebase/firestore";

const ParentDashBoard = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [driverInfo, setDriverInfo] = useState(null);

  const loc = useLocation();
  const studentDetails = loc.state?.user;

  const driverDetails = {
    name: "Kuldeep Yadav",
    id: "APS-D257",
    vehicle: "TATA MAGIC",
    licensePlate: "JH-01-AH-2627",
    rating: "4.0 ⭐",
    status: "Active / On Duty",
    phone: "9988799887",
  };

  useEffect(() => {
    if (!studentDetails?.busId) return;

    const q = query(
      driverCollectionRef,
      where("busId", "==", studentDetails.busId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();

        setDriverInfo({ success: true, user: data });

        setLocation({
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        });
      } else {
        setDriverInfo({
          success: false,
          message: "Currently No Driver Found Contact Transport Office APS",
        });
      }
    });

    return () => unsubscribe();
  }, [studentDetails]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <img className="w-20 h-20 absolute left-10" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
        </header>

        <div className="bg-white p-2 rounded-2xl shadow-lg mb-6 overflow-hidden">
          {location.lat && location.lng ? (
            <div className="relative h-80 w-full rounded-xl overflow-hidden">
              <iframe
                title="Driver Location"
                className="absolute inset-0 w-full h-full border-0"
                src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
              ></iframe>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center">
              Fetching GPS...
            </div>
          )}
        </div>

        {driverInfo && driverInfo.success ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Driver Profile
                </h2>
                <p className="text-sm text-gray-400">
                  Assigned Vehicle Information
                </p>
              </div>
              <span className="px-4 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full border border-green-200">
                {driverDetails.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <InfoField label="Driver Name" value={driverInfo?.user?.name} />
              <InfoField label="Driver ID" value={driverInfo?.user?.driverId} />
              <InfoField label="Vehicle Model" value={driverInfo?.user?.vehicleModel} />
              <InfoField
                label="License Plate"
                value={driverInfo?.user?.vehicleNumber}
              />
              <InfoField label="Bus Id" value={driverInfo?.user?.busId} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Current Location
                </span>
                <span className="text-sm font-mono text-blue-600">
                  {location.lat
                    ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                    : "Waiting..."}
                </span>
              </div>
            </div>
          </div>
        ) : (
          driverInfo && (
            <div className="bg-white p-6 rounded-xl">
              {driverInfo.message}
            </div>
          )
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-6 mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Student Profile
              </h2>
              <p className="text-sm text-gray-400">
                Assigned Vehicle Information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoField label="Student Name" value={studentDetails?.name} />
            <InfoField label="Admission ID" value={studentDetails?.admissionId} />
            <InfoField label="Class" value={studentDetails?.class} />
            <InfoField label="Bus Id" value={studentDetails?.busId} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                ADDRESS
              </span>
              <span className="text-sm font-mono text-blue-600">
                {studentDetails?.address}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default ParentDashBoard;