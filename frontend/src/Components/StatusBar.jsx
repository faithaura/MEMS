import React from 'react';
import '../StatusBar.css';

const StatusBar = ({ activeEmergencies, availableUnits, avgResponseTime, emergenciesToday }) => {
  return (
    <div className="status-bar">
      <div className="status-container">
        <div className="status-item">
          <div className="status-icon active">🚨</div>
          <div className="status-info">
            <span className="status-label">Active Emergencies</span>
            <span className="status-value">{activeEmergencies}</span>
          </div>
        </div>

        <div className="status-item">
          <div className="status-icon available">🚑</div>
          <div className="status-info">
            <span className="status-label">Available Units</span>
            <span className="status-value">{availableUnits}</span>
          </div>
        </div>

        <div className="status-item">
          <div className="status-icon time">⏱️</div>
          <div className="status-info">
            <span className="status-label">Avg Response Time</span>
            <span className="status-value">{avgResponseTime}</span>
          </div>
        </div>

        <div className="status-item">
          <div className="status-icon today">📊</div>
          <div className="status-info">
            <span className="status-label">Emergencies Today</span>
            <span className="status-value">{emergenciesToday}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;