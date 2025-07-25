// src/hooks/useIsAdmin.js
import { useEffect, useState } from 'react';

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const updateRole = () => {
    const role = localStorage.getItem("userRole");
    setIsAdmin(role === "admin");
  };

  updateRole();
  window.addEventListener("storage", updateRole);

  return () => {
    window.removeEventListener("storage", updateRole);
  };
}, []);

  return isAdmin;
};

export default useIsAdmin;