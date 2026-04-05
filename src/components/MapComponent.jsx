import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = (props) => {

  return (
    <div style={{ height: "50vh", width: "50%" }}>
      
      <MapContainer
        center={[props.latitude, props.longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; aviMaps.com'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>
            Bus Location
          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
};

export default MapComponent;