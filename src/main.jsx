import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";       // Make sure this points to App.jsx
import "./index.css";          // Import Tailwind CSS

// Create root and render App inside React StrictMode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
