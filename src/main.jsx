import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// createRoot creates a new root for rendering.
// The render method renders the StrictMode component, which contains the App component.
// StrictMode helps developers identify issues in the application, such as deprecated lifecycle methods or other practices that are not recommended.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
