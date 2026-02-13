import React, { useState, useEffect } from 'react';
import NavigationMap from './Components/NavigationMap';
import EmergencyFacilities from './Components/EmergencyFacilities';
import DispatchComms from './Components/DispatchComms';
import PatientCare from './Components/PatientCare'; 

import './App.css';

function App() {
  // Ambulance state
  const [ambulance, setAmbulance] = useState({
    id: 'AMB-04',
    status: 'Active Duty',
    casesHandled: 0,
    currentSpeed: 68,
    lat: -0.2827,
    lng: 36.0800,
  });

  // Navigation state
  const [navigation, setNavigation] = useState({
    nextManeuver: 'Continue onto Oak Avenue',
    distance: '400m',
    destinationName: 'Central General',
    timeToDestination: '4 min',
    distanceToDestination: '1.8 km',
  });

  // Traffic conditions
  const [trafficConditions, setTrafficConditions] = useState([
    { type: 'congestion', location: '5th & Main', status: 'red' },
    { type: 'clear', location: 'Express route clear via High St', status: 'green' },
  ]);

  // Patient care data
  const [patientCare, setPatientCare] = useState({
    status: 'EN-ROUTE',
    requestId: 'REQ-001',
  });

  // Emergency facilities
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      name: 'Central General',
      level: 'Level 1',
      beds: '4 beds avail.',
      wait: '12m',
      status: 'available',
    },
    {
      id: 2,
      name: 'City Medical Center',
      level: 'Level 2',
      beds: '0 beds avail.',
      wait: '45m',
      status: 'busy',
    },
    {
      id: 3,
      name: "St. Jude Children's",
      level: 'Specialty',
      beds: '12 beds avail.',
      wait: '5m',
      status: 'available',
    },
  ]);

  // Dispatch communications
  const [dispatchMessages, setDispatchMessages] = useState([
    {
      id: 1,
      sender: 'Dispatch',
      code: 'J-1402',
      message: 'Congestion on 5th Ave. Map rerouted via Oak Avenue.',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      sender: 'Central General',
      code: 'J-1258',
      message: 'ER prepped for REQ-001. Cardiac unit standby.',
      timestamp: new Date(Date.now() - 120000),
    },
  ]);

  // Incident/destination coordinates
  const [incident] = useState({
    lat: -0.2900,
    lng: 36.0700,
  });

  const [hospital] = useState({
    name: 'Central General',
    lat: -0.3031,
    lng: 36.0800,
  });

  // Handle new dispatch message
  const handleRadioDispatch = () => {
    console.log('Radio dispatch activated');
    // You can add actual radio dispatch logic here
  };

  return (
    <div className="app-container">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo-section">
          <div className="logo-icon">U</div>
          <div className="logo-text">
            <h1>UzimaNode</h1>
            <p>EMERGENCY INTELLIGENCE</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <button className="nav-tab">🌐 Public</button>
          <button className="nav-tab active">🚑 Ambulance Crew</button>
          <button className="nav-tab">🏥 Hospital ER</button>
          <button className="nav-tab">👤 System Admin</button>
        </nav>

        <div className="user-section">
          <div className="notifications">🔔</div>
          <div className="user-profile">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <span className="user-role">Command Center</span>
              <span className="user-name">Duty Officer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Crew & Driver Dashboard</h2>
          <p>
            Unit: <span className="unit-id">{ambulance.id}</span> | Status:{' '}
            <span className="status-active">{ambulance.status}</span>
          </p>
        </div>
        <div className="dashboard-actions">
          <div className="cases-handled">
            📋 Cases Handled: {ambulance.casesHandled}
          </div>
          <button className="check-in-btn">⚡ Check-In</button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content">
        {/* Left Column - Navigation Map */}
        <div className="left-column">
          <div className="card navigation-card">
            <div className="card-header">
              <h3>🧭 Driver Navigation System</h3>
              <button className="expand-btn">⛶</button>
            </div>

            <NavigationMap
              ambulance={ambulance}
              incident={incident}
              hospital={hospital}
              navigation={navigation}
              currentSpeed={ambulance.currentSpeed}
            />

            {/* Traffic Feed */}
            <div className="traffic-feed">
              <h4>LIVE TRAFFIC FEED</h4>
              <div className="traffic-items">
                {trafficConditions.map((condition, index) => (
                  <div key={index} className={`traffic-item ${condition.status}`}>
                    <span className="traffic-icon">
                      {condition.status === 'red' ? '🔴' : '🟢'}
                    </span>
                    <span className="traffic-text">
                      {condition.type === 'congestion'
                        ? `Congestion at ${condition.location}`
                        : condition.location}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Care Section */}
          <PatientCare patientCare={patientCare} />
        </div>

        {/* Right Column - Facilities & Communications */}
        <div className="right-column">
          <EmergencyFacilities facilities={facilities} />
          <DispatchComms
            messages={dispatchMessages}
            onRadioDispatch={handleRadioDispatch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;