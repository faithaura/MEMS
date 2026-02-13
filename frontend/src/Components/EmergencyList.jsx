import React, { useState } from 'react';
import './EmergencyList.css';

const EmergencyList = ({ emergencies, onSelectEmergency }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleSelectEmergency = (emergency) => {
    setSelectedId(emergency.id);
    onSelectEmergency(emergency);
  };

  const getPriorityClass = (priority) => {
    return priority.toLowerCase();
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  const filteredEmergencies = emergencies.filter(emergency => {
    if (filter === 'all') return true;
    return emergency.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="card emergency-list">
      <h3>🚨 Emergency List</h3>
      
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'in progress' ? 'active' : ''}`}
          onClick={() => setFilter('in progress')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'responding' ? 'active' : ''}`}
          onClick={() => setFilter('responding')}
        >
          Responding
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="emergency-items">
        {filteredEmergencies.length === 0 ? (
          <div className="no-emergencies">
            <p>No emergencies found</p>
          </div>
        ) : (
          filteredEmergencies.map((emergency) => (
            <div
              key={emergency.id}
              className={`emergency-item ${selectedId === emergency.id ? 'selected' : ''}`}
              onClick={() => handleSelectEmergency(emergency)}
            >
              <div className="emergency-header">
                <span className={`priority-badge ${getPriorityClass(emergency.priority)}`}>
                  {emergency.priority}
                </span>
                <span className={`status-badge ${getStatusClass(emergency.status)}`}>
                  {emergency.status}
                </span>
              </div>
              
              <div className="emergency-type">
                {emergency.type}
              </div>
              
              <div className="emergency-details">
                <div className="detail">
                  <span className="icon">📍</span>
                  <span>{emergency.location}</span>
                </div>
                <div className="detail">
                  <span className="icon">⏰</span>
                  <span>{emergency.time}</span>
                </div>
                {emergency.assignedUnit && (
                  <div className="detail">
                    <span className="icon">🚑</span>
                    <span>{emergency.assignedUnit}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyList;