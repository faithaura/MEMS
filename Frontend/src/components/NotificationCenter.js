import React, { useState, useEffect } from 'react';
import notificationService from '../services/NotificationService';

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const loadNotifications = () => {
    const history = notificationService.getHistory();
    setNotifications(history);
    setUnreadCount(notificationService.getUnreadCount());
  };

  const handleMarkAsRead = (id) => {
    notificationService.markAsRead(id);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
    loadNotifications();
  };

  const handleClearAll = () => {
    notificationService.clearHistory();
    loadNotifications();
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getTypeLabel = (type) => {
    const labels = {
      emergency: '🚨 Emergency',
      success: '✓ Success',
      warning: '⚠ Warning',
      info: 'ℹ Info',
      ambulance: '🚑 Ambulance',
      hospital: '🏥 Hospital'
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <div className="notification-center">
      <div className="notification-center-header">
        <h3>Notifications</h3>
        <div className="notification-center-actions">
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead}>
              Mark all read
            </button>
          )}
          <button onClick={handleClearAll}>Clear all</button>
          <button onClick={onClose}>✕</button>
        </div>
      </div>
      
      <div className="notification-center-body">
        {notifications.length === 0 ? (
          <div className="notification-center-empty">
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-center-item ${!notification.read ? 'unread' : ''}`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <div className="notification-center-item-header">
                <span className="notification-center-item-type">
                  {getTypeLabel(notification.type)}
                </span>
                <span className="notification-center-item-time">
                  {formatTime(notification.timestamp)}
                </span>
              </div>
              <div className="notification-center-item-message">
                {notification.title && <strong>{notification.title}: </strong>}
                {notification.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;