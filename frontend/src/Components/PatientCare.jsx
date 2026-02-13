import React, { useState } from 'react';
import './PatientCare.css';

const PatientCare = ({ patientCare }) => {
  const [activeTab, setActiveTab] = useState('details');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    severity: '',
    eta: '',
    ambulance: '',
    paramedic: '',
    assignedRoom: '',
    notes: ''
  });

  const [vitals, setVitals] = useState({
    heartRate: '',
    bloodPressure: '',
    spO2: '',
    temperature: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVitalsChange = (e) => {
    setVitals({
      ...vitals,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card patient-care">
      <div className="patient-care-header">
        <span className="alert-icon">⚠️</span>
        <span className="patient-status">PATIENT CARE ({patientCare.status})</span>
        <span className="request-id">{patientCare.requestId}</span>
      </div>

      <div className="patient-tabs">
        <button
          className={`patient-tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          PATIENT DETAILS
        </button>
        <button
          className={`patient-tab ${activeTab === 'vitals' ? 'active' : ''}`}
          onClick={() => setActiveTab('vitals')}
        >
          LIVE VITALS
        </button>
      </div>

      <div className="patient-content">
        {activeTab === 'details' && (
          <div className="patient-details-section">
          <h3>Patient Details</h3>
          
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Patient name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age:</label>
              <input 
                type="text" 
                name="age" 
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select 
                name="gender" 
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Condition:</label>
            <input 
              type="text" 
              name="condition" 
              value={formData.condition}
              onChange={handleInputChange}
              placeholder="Medical condition"
            />
          </div>

          <div className="form-group">
            <label>Severity:</label>
            <select 
              name="severity" 
              value={formData.severity}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="SEVERE">SEVERE</option>
              <option value="MODERATE">MODERATE</option>
              <option value="STABLE">STABLE</option>
            </select>
          </div>

          <div className="form-group">
            <label>ETA:</label>
            <input 
              type="text" 
              name="eta" 
              value={formData.eta}
              onChange={handleInputChange}
              placeholder="Estimated time of arrival"
            />
          </div>

          <div className="form-group">
            <label>Ambulance:</label>
            <input 
              type="text" 
              name="ambulance" 
              value={formData.ambulance}
              onChange={handleInputChange}
              placeholder="Ambulance ID"
            />
          </div>

          <div className="form-group">
            <label>Paramedic Unit:</label>
            <input 
              type="text" 
              name="paramedic" 
              value={formData.paramedic}
              onChange={handleInputChange}
              placeholder="Paramedic unit"
            />
          </div>

          <div className="form-group">
            <label>Assigned Room:</label>
            <input 
              type="text" 
              name="assignedRoom" 
              value={formData.assignedRoom}
              onChange={handleInputChange}
              placeholder="Room assignment"
            />
          </div>

          <div className="form-group">
            <label>Paramedic Notes:</label>
            <textarea 
              name="notes" 
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Enter paramedic notes"
              rows="3"
            />
          </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="live-vitals-section">
            <h3>Live Vitals</h3>

            <div className="vital-item">
              <label>Heart Rate</label>
              <input 
                type="text" 
                name="heartRate" 
                value={vitals.heartRate}
                onChange={handleVitalsChange}
                placeholder="bpm"
                className="vital-input"
              />
            </div>

            <div className="vital-item">
              <label>Blood Pressure</label>
              <input 
                type="text" 
                name="bloodPressure" 
                value={vitals.bloodPressure}
                onChange={handleVitalsChange}
                placeholder="120/80"
                className="vital-input"
              />
            </div>

            <div className="vital-item">
              <label>SpO2</label>
              <input 
                type="text" 
                name="spO2" 
                value={vitals.spO2}
                onChange={handleVitalsChange}
                placeholder="%"
                className="vital-input"
              />
            </div>

            <div className="vital-item">
              <label>Temperature</label>
              <input 
                type="text" 
                name="temperature" 
                value={vitals.temperature}
                onChange={handleVitalsChange}
                placeholder="°C"
                className="vital-input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCare;