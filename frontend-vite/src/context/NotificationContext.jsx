import Notification from "../components/Notification";
// src/context/NotificationContext.js
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  const showNotification = (msg, duration = 5000) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {message && <Notification message={message} />}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);