import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap ,Circle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const centerMarker = { lat: 22.177287475240846, lng: 75.66043998803785}; // Center marker position
const radius = 0.001; // Radius of the circular motion (in degrees)
const speed = 100; // Speed of movement (lower is faster)

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  // Custom component to update the map center dynamically
  const UpdateMapCenter = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
  };

  useEffect(() => {
    let watchId;

    setTimeout(()=>{
       watchId = navigator.geolocation.watchPosition(
        (position) => {

          
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          
        },
        (error) => console.error(error),
        {
          enableHighAccuracy: true,
        }
      );
    },2000)

    // Cleanup on unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);



  const [movingMarker, setMovingMarker] = useState({
    lat: centerMarker.lat + radius,
    lng: centerMarker.lng,
  });

  useEffect(() => {
    let angle = 0; // Start at angle 0

    const moveMarker = () => {
      angle += 5; // Increase angle to move the marker
      if (angle >= 360) angle = 0; // Reset angle after a full circle

      // Update marker position based on the angle
      const newLat = centerMarker.lat + radius * Math.cos((angle * Math.PI) / 180);
      const newLng = centerMarker.lng + radius * Math.sin((angle * Math.PI) / 180);

      setMovingMarker({ lat: newLat, lng: newLng });

      // Call the moveMarker function again after `speed` milliseconds
      setTimeout(moveMarker, speed);
    };

    moveMarker(); // Start the motion

    return () => clearTimeout(moveMarker); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="relative z-0">
      <MapContainer
        center={currentPosition}
        zoom={15}
        style={{ width: "100%", height: "100vh",zIndex:"-1" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={currentPosition} />
        <Marker position={movingMarker} />
        <Circle center={centerMarker} radius={radius * 111000} />
        <UpdateMapCenter position={currentPosition} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;
