import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MainLayout from './layout/MainLayout';
import './index.css';

// stranice
import Home from './pages/Home';
import Devices from './pages/Devices';
import Rooms from './pages/Rooms';
import Logs from './pages/Logs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="uredjaji" element={<Devices />} />
          <Route path="sobe" element={<Rooms />} />
          <Route path="logovi" element={<Logs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
