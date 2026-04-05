import React, { createContext, useState } from "react";

export const LocationContext = createContext();

const LocationProvider = ({ children }) => {

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  return (
    <LocationContext.Provider
      value={{ latitude, longitude, setLatitude, setLongitude }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;  