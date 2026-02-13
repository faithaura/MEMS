import React from 'react';
import './DispatchComms.css';

const DispatchComms = ({ messages, onRadioDispatch }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card dispatch-comms">
      <div className="card-header">
        <h3>📡 Dispatch Comms</h3>
      </div>

      <div className="messages-list">
        {messages.map((msg) => (
          <div key={msg.id} className="dispatch-message">
            <div className="message-sender">
              {msg.sender} • {msg.code}
            </div>
            <div className="message-text">{msg.message}</div>
          </div>
        ))}
      </div>

      <button className="radio-dispatch-btn" onClick={onRadioDispatch}>
        📻 Radio Dispatch
      </button>
    </div>
  );
};

export default DispatchComms;