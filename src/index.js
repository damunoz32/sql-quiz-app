// index.js - Main Entry Point for SQL Quiz Application
// This file is the starting point of our React application
// It renders the main App component into the DOM

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create the root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);