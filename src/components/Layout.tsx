import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="pt-16 lg:pt-0">
          <Outlet /> {/* Ici React Router injectera la page enfant */}
        </div>
      </main>
    </div>
  );
};

export default Layout;
