import React, { useState } from "react";
import logo from "../assets/APS_LOGO.png";
import { busCollectionRef } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const AddStudent = () => {
  const [drivename, setdrivename] = useState("");
  const [vehicleNumber, setvehicleNumber] = useState("");
  const [busId, setBusId] = useState("");
  const [route, setroute] = useState("");
  const [driverContact, setdriverContact] = useState("");
  const [vehicleModel, setVehicleModel] = useState("")
  const [driverID, setDriverID] = useState("")

  const [successNotification, setSuccessNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);

  const addBus = async (e) => {
    e.preventDefault();

    if (
      drivename == "" ||
      vehicleNumber == "" ||
      busId == "" ||
      route == "" ||
      driverContact == "" ||
      driverContact.length != 10||
      vehicleModel == ""||
      driverID ==""
    ) {
      setErrorNotification(true);
      setTimeout(() => {
        setErrorNotification(false);
      }, 1000);
      return;
    }

    const bus = {
      driverName: drivename,
      vehicleNumber: vehicleNumber.toUpperCase(),
      busId: busId,
      contact: driverContact,
      route: route,
      driverId:driverID,
      vehicleModel:vehicleModel
    };

    try {
      await addDoc(collection(db, "buses"), bus);
      setSuccessNotification(true);
      setTimeout(() => setSuccessNotification(false), 1000);
    } catch (err) {
      setErrorNotification(true);
      setTimeout(() => setErrorNotification(false), 1000);
    }
    setdrivename("");
    setdriverContact("");
    setBusId("");
    setroute("");
    setvehicleNumber("");
    setVehicleModel("")
    setDriverID("")
  };

  return (
    <>
      <style>
        {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    * {
                        font-family: "Poppins", sans-serif;
                    }
                `}
      </style>

      {successNotification && (
        <div className="addedSuccessFullyNotification absolute top-10">
          <div className="p-4 bg-green-500 border border-red-200 rounded text-white">
            STUDENT ADDED SUCCESSFULLY ✅
          </div>
          ;
        </div>
      )}

      {errorNotification && (
        <div className="addedSuccessFullyNotification absolute top-10">
          <div className="p-4 bg-red-600 border border-red-200 rounded text-white">
            ERROR OCCURED!! ❗❗
          </div>
          ;
        </div>
      )}

      <section className="flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
          <div className="p-5">
            <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-start mb-3 tracking-tight">
              ADD STUDENT
            </h1>
            <p className="text-sm/6 text-gray-600 text-center md:text-start mx-auto md:mx-0 mb-5 leading-relaxed max-w-[400px]">
              Apex public school
            </p>

            <form>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Student Name
                  </label>
                  <input
                    value={drivename}
                    onChange={(e) => {
                      setdrivename(e.target.value);
                    }}
                    type="text"
                    placeholder="Ramesh Mahto"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Admission Id
                  </label>
                  <input
                    value={busId}
                    onChange={(e) => {
                      setBusId(e.target.value);
                    }}
                    type="text"
                    placeholder="B060"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Route
                  </label>
                  <input
                    value={route}
                    onChange={(e) => {
                      setroute(e.target.value);
                    }}
                    type="text"
                    placeholder="Gola to Ormanjhi"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Bus Id
                  </label>
                  <input
                    value={vehicleNumber}
                    onChange={(e) => {
                      setvehicleNumber(e.target.value);
                    }}
                    type="text"
                    placeholder="JH-01-AH-8899"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Address
                  </label>
                  <input
                    value={driverID}
                    onChange={(e) => {
                      setDriverID(e.target.value);
                    }}
                    type="text"
                    placeholder="APS-B01D"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Class
                  </label>
                  <input
                    value={vehicleModel}
                    onChange={(e) => {
                      setVehicleModel(e.target.value);
                    }}
                    type="text"
                    placeholder="TATA MAGIC"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>



              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    value={driverID}
                    onChange={(e) => {
                      setDriverID(e.target.value);
                    }}
                    type="text"
                    placeholder="APS-B01D"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    value={vehicleModel}
                    onChange={(e) => {
                      setVehicleModel(e.target.value);
                    }}
                    type="text"
                    placeholder="TATA MAGIC"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-500 mb-2">
                  Student Contact
                </label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
                  <select className="px-3 py-3 text-sm outline-none cursor-pointer text-gray-500 bg-white border-r border-gray-300">
                    <option>IN</option>
                    <option>US</option>
                    <option>UK</option>
                    <option>CA</option>
                  </select>
                  <input
                    value={driverContact}
                    onChange={(e) => {
                      setdriverContact(e.target.value);
                    }}
                    type="tel"
                    placeholder="+91 88888-77777  "
                    className="flex-1 px-3 py-3 text-sm outline-none"
                  />
                </div>
              </div>

              <button
                onClick={(e) => {
                  addBus(e);
                }}
                className="w-full py-3.5 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)]"
              >
                Add Bus
              </button>
            </form>
          </div>

          <div className="rounded-3xl p-10 relative min-h-[420px] w-full max-w-[400px] hidden md:flex flex-col justify-between overflow-hidden">
            <img
              src={logo}
              alt="3D shapes"
              className="absolute left-[160px] top-[130px] inset-0  object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddStudent;
