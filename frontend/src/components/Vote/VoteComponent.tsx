import React, { useState, useEffect } from 'react';

import { ICampagne, IList } from '@/models';
import { useFetchApi } from '@/utils';

import CloseIcon from '@/assets/icons/close.svg';
import VoteIcon from '@/assets/icons/vote.svg';
import VoteDoneIcon from '@/assets/icons/vote_done.svg';

interface VoteComponentProps {
  campagne: ICampagne;
  onClose: React.Dispatch<React.SetStateAction<ICampagne | null>>;
}

export const VoteComponent = ({ campagne, onClose }: VoteComponentProps) => {
  const [hasVote, setHasVote] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<{
    login: string;
    userData: { firstName: string; lastName: string };
  } | null>(null);
  const [voteData, setVoteData] = useState<{
    listId: string;
    listName: string;
  } | null>(null);
  const [voteDone, setVoteDone] = useState<boolean>(false);

  const { fetchApi } = useFetchApi();

  useEffect(() => {
    const checkHasVote = async () => {
      const response = await fetchApi(`vote/has-vote/${campagne._id}`);
      setHasVote(response.hasVote);
    };

    checkHasVote();
  }, [campagne._id, fetchApi]);

  const voteFor = async (listId: string, listName: string) => {
    const userDataResponse = await fetchApi('auth/me');

    if (!userDataResponse) {
      return;
    }

    setUserData(userDataResponse);
    setVoteData({ listId, listName });
    setShowModal(true);

    console.log(`Voted for ${listId} (${listName})`);
  };

  const confirmVote = async () => {
    const response = await fetchApi(
      `vote/vote-for/${voteData?.listId}`,
      'POST',
      true,
      {
        campagneId: campagne._id,
      }
    );
    if (!response) {
      // Vous pouvez afficher une popup d'erreur ici
      return;
    }
    setVoteDone(true);
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg md:max-w-4xl mx-auto flex flex-col gap-6 relative">
      {voteDone ? (
        <div className="flex flex-col gap-10 my-auto">
          <h1 className="text-6xl">
            Votre vote à bien été pris en compte, merci !{' '}
          </h1>
          <a
            href="/"
            className="bg-bde-gold px-4 py-2 text-black rounded-lg shadow-md w-fit"
          >
            Retour à l'accueil
          </a>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-6">
            <h1 className="text-3xl font-semibold">Choisir mon vote</h1>
            <button
              className="text-red-500 flex flex-row items-center gap-2"
              onClick={() => onClose(null)}
            >
              <p className="hidden md:block text-lg">Accueil</p>
              <img src={CloseIcon} alt="Fermer" className="h-8 w-8" />
            </button>
          </div>
          <h1 className="text-2xl font-medium">{campagne.desc}</h1>

          <hr className="border-gray-300" />

          <div className="flex flex-col gap-2">
            {hasVote ? (
              <h1 className="flex flex-row gap-2 text-lg text-center mx-auto items-center">
                Vous avez déjà voté
                <img
                  src={VoteDoneIcon}
                  alt="Vote déjà effectué"
                  className="h-8 w-8"
                />
              </h1>
            ) : (
              <>
                <h1 className="flex flex-row gap-2 text-lg text-center mx-auto items-center">
                  Voter pour
                  <img src={VoteIcon} alt="Vote" className="h-8 w-8" />
                </h1>
                <div className="flex flex-row justify-around items-center">
                  {(campagne.lists as IList[]).map((list, index) => (
                    <React.Fragment key={list._id}>
                      <button
                        onClick={() => voteFor(list._id, list.name)}
                        className="flex flex-col gap-2 items-center transform transition-transform duration-300 hover:scale-110"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL}public/logos/${list.filename}`}
                          alt={list.name}
                          className="h-20 w-20 cursor-pointer"
                        />
                        <p>{list.trigram}</p>
                      </button>
                      {index < (campagne.lists as IList[]).length - 1 && (
                        <span className="text-xl font-semibold">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            )}
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.8)] z-50">
              <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                  <img src={CloseIcon} alt="Fermer" className="h-6 w-6" />
                </button>
                <h1 className="text-4xl font-semibold mb-4">
                  Confirmer mon vote
                </h1>
                <p className="mb-2">Je soussigné :</p>
                <h2 className="text-xl font-medium mb-4">
                  {userData?.userData.firstName}{' '}
                  {userData?.userData.lastName.toUpperCase()}
                </h2>
                <p className="mb-2">donne ma voix pour :</p>
                <h2 className="text-xl font-medium mb-6">
                  {voteData?.listName}
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmVote}
                    className="px-4 py-2 bg-bde-gold text-black rounded hover:bg-blue-700"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
