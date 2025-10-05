import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const ConfirmationPage: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>();
  const location = useLocation();
  const { status, message, transactionId: stateTransactionId, amount, productTitle, quantity } = location.state || {};

  // Determine the transaction status and fallback if state is missing
  const transactionStatus = status || (transactionId === "cancelled" ? "cancelled" : transactionId === "error" ? "error" : "success");
  const displayTransactionId = stateTransactionId || transactionId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center space-y-6 animate-fade-in">
        {transactionStatus === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-teal-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Paiement réussi !</h1>
            <p className="text-gray-600">
              Merci pour votre achat de <strong>{productTitle || "votre produit"}</strong> (Quantité: {quantity || 1}).
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">ID de transaction : {displayTransactionId || "N/A"}</p>
              <p className="text-sm text-gray-500">Montant : {(amount || 0).toFixed(2)} XOF</p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg"
            >
              <Link to="/" aria-label="Retourner à l'accueil">
                Retourner à l'accueil
              </Link>
            </Button>
          </>
        )}
        {transactionStatus === "cancelled" && (
          <>
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Paiement annulé</h1>
            <p className="text-gray-600">{message || "Vous avez annulé le paiement. Aucun montant n'a été débité."}</p>
            <div className="flex gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg"
              >
                <Link to={`/products/${transactionId}`} aria-label="Réessayer le paiement">
                  Réessayer le paiement
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Link to="/" aria-label="Retourner à l'accueil">
                  Retourner à l'accueil
                </Link>
              </Button>
            </div>
          </>
        )}
        {transactionStatus === "error" && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto" />
            <h1 className="text-3xl font-bold text-gray-900">Erreur de paiement</h1>
            <p className="text-gray-600">{message || "Une erreur s'est produite lors du traitement de votre paiement."}</p>
            <div className="flex gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg"
              >
                <Link to={`/products/${transactionId}`} aria-label="Réessayer le paiement">
                  Réessayer le paiement
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Link to="/" aria-label="Retourner à l'accueil">
                  Retourner à l'accueil
                </Link>
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