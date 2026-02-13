import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ 
  id,
  message, 
  type = 'info', 
  priority = 'normal',
  onClose, 
  duration = 5000,
  title,
  details
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (type !== 'emergency' && priority !== 'high' && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, type, priority]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose(id);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'emergency':
        return '🚨';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'ambulance':
        return '🚑';
      case 'hospital':
        return '🏥';
      default:
        return 'ℹ';
    }
  };

  const shouldPulse = type === 'emergency' || priority === 'high';

  return (
    <div className={`notification notification-${type} ${shouldPulse ? 'notification-pulse' : ''}`}>
      <div className="notification-header">
        <div className="notification-icon">{getIcon()}</div>
        <div className="notification-content">
          {title && <div className="notification-title">{title}</div>}
          <div className="notification-message">{message}</div>
        </div>
        <button 
          onClick={handleClose}
          className="notification-close"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
      
      {details && (
        <div className="notification-details-container">
          <button 
            className="notification-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼ Hide Details' : '▶ Show Details'}
          </button>
          {isExpanded && (
            <div className="notification-details">
              {details}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notification;