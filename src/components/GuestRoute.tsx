import React from "react";
import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
  // Vérifie si le token existe dans localStorage
  const token = localStorage.getItem("auth_token");

  if (token) {
    // Si connecté, redirige vers le dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Sinon, rend le contenu de la page (login ou register)
  return <>{children}</>;
};

export default GuestRoute;
