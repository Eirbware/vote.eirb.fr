import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

export const Login = () => {
  const [errorOnLogin, setErrorOnLogin] = useState<boolean>(false);
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  const { setJwt } = useAuth();
  const navigate = useNavigate();

  const CASLogin = () => {
    const redirectUrl = window.location.href;
    const serviceUrl = 'https://cas.serveur-bde.eirb.fr/';
    const encodedUrl = encodeURIComponent(
      `${serviceUrl}?token=${btoa(redirectUrl)}`
    );
    const authenticationCasUrl = `https://cas.bordeaux-inp.fr/login?service=${encodedUrl}`;
    window.location.href = authenticationCasUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (ticket) {
      window.history.replaceState({}, document.title, window.location.pathname);

      const redirectUrl = window.location.href
        .replace(`ticket=${ticket}`, '')
        .replace('?&', '?')
        .replace('&&', '&');

      const fetchData = async () => {
        try {
          const response = await fetch(
            `${BACKEND_URL}auth/login-cas?ticket=${ticket}&redirectUrl=${btoa(
              redirectUrl
            )}`,
            { method: 'GET' }
          );

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
    }
  }, [BACKEND_URL, setJwt, navigate]);

  return (
    <div className="relative">
      <h1>Login</h1>
      <button
        onClick={CASLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with CAS
      </button>

      {errorOnLogin && (
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded shadow-lg transition-transform animate-slide-down">
          Erreur de connexion au CAS. Veuillez réessayer.
        </div>
      )}
    </div>
  );
};
