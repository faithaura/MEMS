import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NavigationMap.css';

// Custom icons
const ambulanceIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2961/2961973.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const incidentIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448439.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Component to fit bounds
const FitBounds = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 0) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, route]);

  return null;
};

const NavigationMap = ({ ambulance, incident, hospital, navigation, currentSpeed }) => {
  const route = [
    [ambulance.lat, ambulance.lng],
    [incident.lat, incident.lng],
    [hospital.lat, hospital.lng],
  ];

  return (
    <div className="navigation-map-container">
      {/* Next Maneuver Display */}
      <div className="next-maneuver">
        <div className="maneuver-icon">
          <div className="arrow-up">↑</div>
        </div>
        <div className="maneuver-info">
          <div className="maneuver-label">NEXT MANEUVER</div>
          <div className="maneuver-instruction">
            {navigation.distance} • {navigation.nextManeuver}
          </div>
        </div>
      </div>

      {/* Destination Card */}
      <div className="destination-card">
        <div className="destination-label">DESTINATION</div>
        <div className="destination-name">🏥 {navigation.destinationName}</div>
        <div className="destination-stats">
          <span className="time-eta">{navigation.timeToDestination}</span>
          <span className="distance-eta">{navigation.distanceToDestination}</span>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[ambulance.lat, ambulance.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <FitBounds route={route} />

        <Marker position={[ambulance.lat, ambulance.lng]} icon={ambulanceIcon}>
          <Popup>Ambulance {ambulance.id}</Popup>
        </Marker>

        <Marker position={[incident.lat, incident.lng]} icon={incidentIcon}>
          <Popup>Incident Location</Popup>
        </Marker>

        <Marker position={[hospital.lat, hospital.lng]} icon={hospitalIcon}>
          <Popup>{hospital.name}</Popup>
        </Marker>

        <Polyline positions={route} color="#3b82f6" weight={4} opacity={0.8} dashArray="10, 10" />
      </MapContainer>

      {/* Speed Display */}
      <div className="speed-display">
        <div className="speed-value">{currentSpeed}</div>
        <div className="speed-unit">km/h</div>
        <div className="speed-label">Emergency Ops</div>
      </div>

      {/* Center Button */}
      <button className="center-map-btn">▶</button>
    </div>
  );
};

export default NavigationMap;