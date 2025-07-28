import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

import MainLayout from './layout/MainLayout';
import './index.css';

import ProtectedRoute from './components/ProtectedRoute.jsx';
import { NotificationProvider } from './context/NotificationContext';

// stranice
import HomePage from './pages/HomePage';
import Devices from './pages/Devices';
import Rooms from './pages/Rooms';
import Logs from './pages/Logs';
import Users from './pages/Users';
import Admin from './pages/Admin';
import Login from './pages/Login';
import MyDevices from './pages/MyDevices';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>

            {/* generalne rute */}
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />

            {/* slobodne rute */}
            <Route index element={<HomePage />} />
            {/* kasnije brisati !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <Route path="components" element={<App />} /> 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="my-devices" element={<MyDevices />} />

            {/* za admina */}
            <Route path="admin" element={
              <ProtectedRoute element={<Admin />} allowedRoles={["admin"]} />
            } />
            <Route path="devices" element={
              <ProtectedRoute element={<Devices />} allowedRoles={["admin"]} />
            } />
            <Route path="rooms" element={
              <ProtectedRoute element={<Rooms />} allowedRoles={["admin"]} />
            } />
            <Route path="logs" element={
              <ProtectedRoute element={<Logs />} allowedRoles={["admin"]} />
            } />
            <Route path="users" element={
              <ProtectedRoute element={<Users />} allowedRoles={["admin"]} />
            } />

          </Route>
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);