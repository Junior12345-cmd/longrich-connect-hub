import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import axiosInstance from "@/services/axiosInstance";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    // console.log("Token trouvé :", token);
    // Redirection immédiate si pas de token
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Vérification serveur en arrière-plan
    const verifyToken = async () => {
      try {
        // await axiosInstance.get('/sanctum/csrf-cookie');

        const response = await axiosInstance.get("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error: any) {
        if (error.response?.status === 401) {
          localStorage.removeItem("auth_token");
          navigate("/login", { replace: true });
        }
      }
    };

    verifyToken();
  }, [navigate]);

  // Tant que l'utilisateur n'est pas encore défini, on peut afficher rien ou un loader
  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Navigation isAuthenticated={!!user} />
      <main className="flex-1 lg:ml-64 min-h-screen overflow-auto">
        <div className="pt-16 lg:pt-0 px-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
