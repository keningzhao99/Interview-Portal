// src/App.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import "./styles/Navbar.css";

const App = () => {
  const location = useLocation();

  // Defined paths where the Navbar should not be shown (expected login page)
  const noNavbarPaths = ["/"];

  return (
    <div className="App">
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Outlet /> {/* This will render child routes */}
    </div>
  );
};

export default App;
