import React, { useState } from "react";
import '../CommunicationHub.css';

const quickMessages = [
  "En route, ETA 5 mins",
  "Patient loaded, transporting",
  "Arrived at hospital",
];

const CommunicationHub = () => {
  const [messages, setMessages] = useState([]);
  const [customMessage, setCustomMessage] = useState("");

  const sendMessage = (text) => {
    const newMessage = {
      text,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleCustomSend = () => {
    if (customMessage.trim() === "") return;
    sendMessage(customMessage);
    setCustomMessage("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Communication Hub</h2>

      {/* Quick Messages */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {quickMessages.map((msg, index) => (
          <button
            key={index}
            onClick={() => sendMessage(msg)}
            style={{
              padding: "10px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#1976d2",
              color: "white",
              cursor: "pointer",
            }}
          >
            {msg}
          </button>
        ))}
      </div>

      {/* Custom Message */}
      <div style={{ marginTop: "15px" }}>
        <input
          type="text"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Type custom message..."
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleCustomSend}
          style={{
            padding: "10px 16px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>

      {/* Message Log */}
      <div style={{ marginTop: "20px" }}>
        <h3>Message Log</h3>
        {messages.length === 0 && <p>No messages sent yet.</p>}

        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              background: "#f5f5f5",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "6px",
              fontSize: "14px",
            }}
          >
            <strong>{msg.time}</strong> — {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationHub;
