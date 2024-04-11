import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"; 
import L from 'leaflet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.icon({
  iconUrl: require("../../data/marker.png"),
  iconSize: [25,25]
})

const Map = () => {
  const [location, setLocation] = useState({
    lat: 4.2105,
    lng: 101.9758,
  });
  const [userLocation, setUserLocation] = useState(null);

  const position = [location.lat, location.lng];

  const getCurrentLocation = () => {
    // Get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <div>
      <MapContainer center={position} zoom={13} style={{ height: "800px", width: "auto"}}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Default Marker with Popup
        <Marker 
          position={[4.2105, 101.9758]}
          icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}

        {/* Marker for user's location */}
{/* Marker for user's location */}
    {userLocation && (
      <Marker position={[userLocation.lat, userLocation.lng]} icon={markerIcon}>
        <Popup>
          Ripe: 1 <br/> Abnormal: 1
        </Popup>
      </Marker>
    )}
      </MapContainer>
      <button className="map-button" onClick={getCurrentLocation}>Mark Current Location</button>
    </div>
  );
};

export default Map;
