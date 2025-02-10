import { useState } from 'react';
import { useAuth } from '@/hooks';

import BdeLogo from '@assets/logos/bde.png';
import EirbwareNoTextLogo from '@assets/logos/eirbware_no_text.png';
import LogoutIcon from '@assets/icons/logout.svg';
import PollIcon from '@assets/icons/poll.svg';
import MedalIcon from '@assets/icons/medal.svg';
import VoteIcon from '@assets/icons/vote.svg';

interface HeaderContentProps {
  currentPath: string;
  logout: () => void;
}

const HeaderContent = ({ currentPath, logout }: HeaderContentProps) => (
  <div className="p-3">
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 w-full">
      <div className="flex flex-row gap-4 items-center">
        <img src={BdeLogo} alt="Logo BDE" className="h-16" />
        <img src={EirbwareNoTextLogo} alt="Logo Eirbware" className="h-16" />
      </div>
      <div className="text-center">
        <h1 className="text-lg md:text-3xl font-semibold">
          Plateforme de vote en ligne
        </h1>
        <p className="text-gray-600 text-xs md:text-base">
          Réalisez votre vote pour élire le prochain mandat
        </p>
      </div>
      <button
        onClick={logout}
        className="flex items-center gap-2 bg-[#ffdd03] hover:bg-yellow-400 font-medium py-2 px-3 rounded-lg transition-all duration-300"
      >
        <img src={LogoutIcon} alt="Logout" className="h-5 w-5" />
        Se déconnecter
      </button>
    </div>

    <hr className="border-t border-gray-300 my-6 drop-shadow-lg" />

    <div className="flex flex-col md:flex-row justify-around gap-4 max-w-xl mx-auto">
      <a
        href="/"
        className={`flex flex-row items-center justify-center gap-2 px-2 py-2 text-black font-semibold rounded-lg shadow-md transition-all duration-300 ${
          currentPath === '/' ? 'bg-[#ffdd03] hover:bg-yellow-400' : ''
        }`}
      >
        <img src={VoteIcon} alt="Vote" className="h-6 w-auto" />
        <span>Vote</span>
        <img src={VoteIcon} alt="Vote" className="h-6 w-auto" />
      </a>

      <a
        href="/results"
        className={`flex flex-row items-center justify-center gap-2 px-2 py-2 text-black font-semibold rounded-lg shadow-md transition-all duration-300 ${
          currentPath === '/results' ? 'bg-[#ffdd03] hover:bg-yellow-400' : ''
        }`}
      >
        <img src={PollIcon} alt="Résultats" className="h-6 w-auto" />
        <span>Résultats</span>
        <img src={MedalIcon} alt="Résultats" className="h-6 w-auto" />
      </a>
    </div>
  </div>
);

export const Header = () => {
  const { logout } = useAuth();
  const currentPath = window.location.pathname;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => setModalOpen(true), 10);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalVisible(false), 500);
  };

  return (
    <>
      <div className="hidden md:block">
        <HeaderContent currentPath={currentPath} logout={logout} />
      </div>

      <div className="block md:hidden">
        <div className="flex justify-between items-center p-3">
          <div className="flex flex-row gap-4 items-center">
            <img src={BdeLogo} alt="Logo BDE" className="h-12" />
            <img
              src={EirbwareNoTextLogo}
              alt="Logo Eirbware"
              className="h-12"
            />
          </div>
          <button onClick={openModal} className="p-2">
            <svg
              className="h-6 w-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <h1 className="text-md font-semibold text-center">
          Plateforme de vote en ligne
        </h1>
        <p className="text-gray-600 text-xs text-center">
          Réalisez votre vote pour élire le prochain mandat
        </p>
        <hr className="border-t border-gray-300 my-6 drop-shadow-lg" />

        {modalVisible && (
          <div
            className={`fixed inset-0 z-50 bg-white overflow-auto transition-opacity duration-500 ${
              isModalOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-7">
              <div className="flex justify-end">
                <button onClick={closeModal} className="p-2">
                  <svg
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <HeaderContent currentPath={currentPath} logout={logout} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
