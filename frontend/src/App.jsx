// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import './styles/Navbar.css';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Outlet /> {/* This will render child routes */}
    </div>
  );
};

export default App;
