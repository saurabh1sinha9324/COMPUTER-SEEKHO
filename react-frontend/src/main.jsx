// Import core React libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

// Import BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom';

// Import the root App component
import App from './App';

// Import global styles
import './index.css';

// Create the root of the React application and render the App component wrapped in BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  // Enables client-side routing in the application
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
