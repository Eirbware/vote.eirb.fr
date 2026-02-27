import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';
import { Footer } from '@/components';

import EirbwareNoTextLogo from '@assets/logos/eirbware_no_text.png';
import BdeLogo from '@assets/logos/bde.png';
//import LogoINP from '@assets/logos/bdxINP-monochrome-noir.png';

export const Login = () => {
  const [errorOnLogin, setErrorOnLogin] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const { setJwt } = useAuth();
  const navigate = useNavigate();

  const EirbConnectLogin = () => {
    const redirectUrl = window.location.href;
    const requestUrl = `${BACKEND_URL}auth/login?redirectUrl=${redirectUrl}`;
    fetch(requestUrl).then((response) => {
      response.json().then((result) => {
        window.location.href = result.redirectUrl;
        sessionStorage.setItem("code_verifier", result.code_verifier);
        sessionStorage.setItem("state", result.state);
      })
    })
  };

  useEffect(() => {
    const code_verifier = sessionStorage.getItem("code_verifier");
    const state = sessionStorage.getItem("state");

    if (!state && !code_verifier){
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}auth/verify-login?currentUrl=${encodeURIComponent(window.location.href)}&code_verifier=${code_verifier}&state=${state}`
        )
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setJwt(result.jwt);

        navigate('/');
      } catch {
        setErrorOnLogin(true);

        setTimeout(() => {
          setErrorOnLogin(false);
        }, 7000);
      }
    };

    fetchData();
    sessionStorage.removeItem("code_verifier");
    sessionStorage.removeItem("state");

    return;
  }, [BACKEND_URL, setJwt, navigate]);

  return (
    <div className="relative flex flex-col h-screen p-4 justify-between">
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 w-full">
          <div className="flex flex-row gap-4 items-center">
            <img src={BdeLogo} alt="Logo BDE" className="h-16" />
            <img
              src={EirbwareNoTextLogo}
              alt="Logo Eirbware"
              className="h-16"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold">
              Plateforme de vote en ligne
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Réalisez votre vote pour élire le prochain mandat
            </p>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-6 drop-shadow-lg" />
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 ">
          Connexion à la Plateforme de Vote en ligne
        </h1>
        <h2 className="text-xl font-medium mb-3 ">Se connecter avec Eirbconnect</h2>
        <p className="text-gray-600">
          Eirbconnect est la solution proposé par Eirbware pour se connecter à l'ensemble des 
          sites de l'associatif de l'Enseirb. 
          Il suffit d'avoir un CAS - un compte permettant de se connecter aux sites pédagogiques de Bordeaux INP -
          pour pouvoir l'utiliser
        </p>
        <button
          onClick={EirbConnectLogin}
          className="my-4 flex items-center gap-2 bg-[#ffdd03] hover:bg-yellow-400 font-medium py-2 px-6 rounded-lg transition-all duration-300"
        >
         {/* <img src={LogoINP} alt="Logo INP" className="h-6 w-auto" /> */}
          Se connecter
        </button>
        <blockquote className="italic text-gray-500 text-sm opacity-80 mb-6">
          En cliquant sur ce bouton, vous acceptez que nous utilisions votre nom
          et prénom de manière temporaire pendant votre session. Cependant, nous
          stockons votre login CAS à long terme pour garantir que vous ne votiez
          qu'une seule fois.
        </blockquote>
      </div>

      <Footer />

      {errorOnLogin && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded shadow-lg transition-transform animate-slide-down">
          Erreur d'authentification. Veuillez réessayer.
        </div>
      )}
    </div>
  );
};
