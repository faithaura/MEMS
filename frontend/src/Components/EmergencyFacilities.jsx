import React from 'react';
import './EmergencyFacilities.css';

const EmergencyFacilities = ({ facilities }) => {
  return (
    <div className="card emergency-facilities">
      <div className="card-header">
        <h3>🏥 Emergency Facilities</h3>
      </div>

      <div className="facilities-list">
        {facilities.map((facility) => (
          <div key={facility.id} className={`facility-item ${facility.status}`}>
            <div className="facility-info">
              <h4 className="facility-name">{facility.name}</h4>
              <p className="facility-details">
                {facility.level} • {facility.beds}
              </p>
            </div>
            <div className={`facility-wait wait-${facility.status}`}>
              <span className="wait-time">{facility.wait}</span>
              <span className="wait-label">WAIT</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyFacilities;