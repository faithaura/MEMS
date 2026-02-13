import React, { useState, useEffect } from 'react';
import './App.css';
import Notification from './components/Notification';
import NotificationCenter from './components/NotificationCenter';
import notificationService from './services/NotificationService';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    notificationService.connect('http://localhost:5000');

    const unsubscribe = notificationService.subscribe((notification) => {
      if (notification.type === 'connection') {
        setConnectionStatus(notification.status);
      } else {
        setNotifications((prev) => {
          const updated = [notification, ...prev].slice(0, 5);
          return updated;
        });
        
        setUnreadCount(notificationService.getUnreadCount());
      }
    });

    return () => {
      unsubscribe();
      notificationService.disconnect();
    };
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleToggleNotificationCenter = () => {
    setShowNotificationCenter(!showNotificationCenter);
    if (!showNotificationCenter) {
      setUnreadCount(notificationService.getUnreadCount());
    }
  };

  const testEmergency = () => {
    notificationService.handleIncomingNotification({
      type: 'emergency',
      priority: 'high',
      title: 'Emergency Alert',
      message: 'Code Red: Multiple casualties reported',
      details: 'Estimated 4-6 patients. Dispatch all available ambulances.',
      playSound: true
    });
  };

  const testAmbulanceArrival = () => {
    notificationService.handleIncomingNotification({
      type: 'ambulance',
      priority: 'normal',
      title: 'Ambulance Arrival',
      message: 'Ambulance #A-103 arriving in 3 minutes',
      details: 'Patient: Critical trauma case.',
      playSound: true
    });
  };

  const testHospitalAcceptance = () => {
    notificationService.handleIncomingNotification({
      type: 'hospital',
      priority: 'normal',
      title: 'Hospital Acceptance',
      message: 'City Hospital has accepted patient transfer',
      details: 'Bed assigned: ICU-204. ETA: 15 minutes.',
      playSound: false
    });
  };

  const testWarning = () => {
    notificationService.handleIncomingNotification({
      type: 'warning',
      priority: 'normal',
      title: 'Capacity Warning',
      message: 'City General Hospital at 95% capacity',
      details: 'Consider routing non-critical cases to alternate facilities.',
      playSound: false
    });
  };

  const testSuccess = () => {
    notificationService.handleIncomingNotification({
      type: 'success',
      priority: 'normal',
      title: 'Transfer Complete',
      message: 'Patient successfully transferred',
      details: 'Transfer completed. All vitals stable.',
      playSound: false
    });
  };

  return (
    <div className="App">
      <div className={`connection-status ${connectionStatus}`}>
        <span className="connection-status-dot"></span>
        {connectionStatus === 'connected' && 'Connected'}
        {connectionStatus === 'disconnected' && 'Disconnected'}
        {connectionStatus === 'connecting' && 'Connecting...'}
      </div>

      <div className="app-header">
        <h1>🚑 Emergency Response System</h1>
        <p>Real-Time Notification Dashboard</p>
      </div>

      <div className="app-content">
        <div className="test-controls">
          <h2>Test Notifications</h2>
          <div className="button-grid">
            <button onClick={testEmergency} className="btn btn-emergency">
              🚨 Emergency Alert
            </button>
            <button onClick={testAmbulanceArrival} className="btn btn-ambulance">
              🚑 Ambulance Arrival
            </button>
            <button onClick={testHospitalAcceptance} className="btn btn-hospital">
              🏥 Hospital Acceptance
            </button>
            <button onClick={testWarning} className="btn btn-warning">
              ⚠ Capacity Warning
            </button>
            <button onClick={testSuccess} className="btn btn-success">
              ✓ Transfer Success
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3>Features</h3>
          <ul>
            <li>✓ Real-time Socket.IO notifications</li>
            <li>✓ Audio alerts for emergencies</li>
            <li>✓ Visual alerts with animations</li>
            <li>✓ Notification history center</li>
            <li>✓ Priority-based display</li>
            <li>✓ Auto-reconnection on disconnect</li>
          </ul>
        </div>
      </div>

      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            priority={notification.priority}
            title={notification.title}
            message={notification.message}
            details={notification.details}
            onClose={removeNotification}
          />
        ))}
      </div>

      <button
        className="notification-center-button"
        onClick={handleToggleNotificationCenter}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </button>

      <NotificationCenter
        isOpen={showNotificationCenter}
        onClose={() => setShowNotificationCenter(false)}
      />
    </div>
  );
}

export default App;
