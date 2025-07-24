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
import Users from './pages/Users';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MyDevices from './pages/MyDevices';
import Register from './pages/Register';

import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';


const root = ReactDOM.createRoot(document.getElementById('root'));

const storedUser = localStorage.getItem('user');
const isAdmin = storedUser && JSON.parse(storedUser).role === 'admin';

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="admin" element={<Admin />} />
          <Route path="devices" element={<Devices />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="logs" element={<Logs />} />
          <Route path="my-devices" element={<MyDevices />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
