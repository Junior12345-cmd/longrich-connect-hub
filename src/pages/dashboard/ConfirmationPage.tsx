import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import axiosInstance from "@/services/axiosInstance";
import Swal from "sweetalert2";

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const commandeId = searchParams.get("commande_id");
  const transactionId = searchParams.get("transaction_id");
  const [transactionStatus, setTransactionStatus] = useState<"success" | "cancelled" | "error" | null>(null);

  // Détecte le type de confirmation depuis l'URL
  useEffect(() => {
    if (location.pathname.includes("/success")) {
      setTransactionStatus("success");
    } else if (location.pathname.includes("/cancel")) {
      setTransactionStatus("cancelled");
    } else if (location.pathname.includes("/error")) {
      setTransactionStatus("error");
    }
  }, [location.pathname]);

  // Vérifie la transaction uniquement si success
  const verifyTransaction = async (commandeId: string, transactionId: string) => {
    try {
      const response = await axiosInstance.post("/api/verify-fedapay-transaction", {
        commande_id: commandeId,
        transaction_id: transactionId,
      });
  
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Transaction vérifiée",
          text: `Statut de la commande : ${response.data.transaction_status}`,
          confirmButtonColor: "#3085d6",
        });
      } 

      if (response.data.status === "errorTraitement") {
        Swal.fire({
          icon: "info",
          title: "Transaction déjà traitée",
          text: "Cette transaction existe déjà.",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          navigate(-1);
        });
      } 
      // Tu peux gérer d'autres statuts personnalisés ici si nécessaire
    } catch (error: any) {
      // Gérer le cas où la transaction existe déjà
      const status = error.response?.status;
      const message = error.response?.data?.message;
      // Gérer toutes les autres erreurs
      Swal.fire({
        icon: "error",
        title: "Erreur de vérification",
        text: "Impossible de vérifier la transaction. Réessayez plus tard.",
        confirmButtonColor: "#d33",
      }).then(() => {
        navigate(-1);
      });
}
  };
  
  
    

  useEffect(() => {
    if (transactionStatus === "success" && commandeId && transactionId) {
      verifyTransaction(commandeId, transactionId);
    }
  }, [transactionStatus, commandeId, transactionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center space-y-6 animate-fade-in">

        {transactionStatus === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-teal-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Paiement réussi !</h1>
            <p className="text-gray-600">
              Merci pour votre achat ! Votre transaction a été validée avec succès.
            </p>
            <p className="text-sm text-gray-500">ID de transaction : {transactionId}</p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg"
            >
              <Link to="/">Retourner à l'accueil</Link>
            </Button>
          </>
        )}

        {transactionStatus === "cancelled" && (
          <>
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Paiement annulé</h1>
            <p className="text-gray-600">
              Vous avez annulé le paiement. Aucun montant n'a été débité.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Link to="/">Retourner à l'accueil</Link>
              </Button>
            </div>
          </>
        )}

        {transactionStatus === "error" && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Erreur de paiement</h1>
            <p className="text-gray-600">
              Une erreur s'est produite lors du traitement de votre paiement.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Link to="/">Réessayer</Link>
              </Button>
            </div>
          </>
        )}
      </div>

      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmationPage;
