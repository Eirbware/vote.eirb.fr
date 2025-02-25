import React from 'react';

import { ICampagne, IList } from '@/models';

import LocationIcon from '@/assets/icons/location.svg';
import InfoIcon from '@/assets/icons/info.svg';
import VoteIcon from '@/assets/icons/vote.svg';

interface CurrentVotesProps {
  currentVotes: ICampagne[];
  setVote: React.Dispatch<React.SetStateAction<ICampagne | null>>;
}

export const CurrentVotes = ({ currentVotes, setVote }: CurrentVotesProps) => {
  const today = new Date();

  const getRemainingDays = (endDate: Date) => {
    const end = new Date(endDate);
    const totalDuration = end.getTime() - today.getTime();
    const remainingDays = Math.floor(totalDuration / (1000 * 60 * 60 * 24));
    return remainingDays;
  };

  const getProgress = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDuration = end.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();
    const progress =
      totalDuration > 0
        ? Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100)
        : 0;
    return progress.toFixed(2);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <>
      {currentVotes && currentVotes.length > 0 && (
        <div>
          <h1 className="text-2xl font-semibold my-4 md:text-center">
            Les votes en cours
          </h1>
          <div>
            {currentVotes.map((campagne) => {
              const progress = getProgress(
                campagne.openVoteDate,
                campagne.closeVoteDate
              );

              return (
                <div
                  key={campagne._id}
                  className="flex flex-col border border-gray-300 rounded-lg p-4 gap-2 md:max-w-4xl mx-auto my-6"
                >
                  <div className="flex flex-row-reverse justify-between items-center md:flex-col md:items-start">
                    <div className="flex flex-row justify-between md:w-full">
                      <p className="text-lg flex gap-2 items-center hidden md:flex">
                        <img src={LocationIcon} className="h-8 w-8" />
                        {campagne.school}
                      </p>
                      <p className="bg-bde-gold px-2 py-1 text-lg rounded-xl">
                        {campagne.type}
                      </p>
                    </div>

                    <h2 className="text-center text-xl font-medium md:text-left md:mx-auto">
                      {campagne.desc}
                    </h2>
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <div className="flex flex-row">
                    <p className="flex flex-row gap-2 items-center text-md">
                      <img
                        src={InfoIcon}
                        className="h-8 w-8 bg-bde-gold rounded-full"
                      />
                      {getRemainingDays(campagne.closeVoteDate) + 1 === 0
                        ? "Les votes se ferment aujourd'hui à minuit!"
                        : getRemainingDays(campagne.closeVoteDate) +
                          1 +
                          ' jours avant la fermeture des votes !'}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <div className="flex-1 border border-gray-300 rounded-3xl bg-gray-100">
                      <div
                        className="relative overflow-hidden h-3 rounded-3xl transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          background: `rgb(${(255 * Number(progress)) / 100}, ${
                            255 - (255 * Number(progress)) / 100
                          }, 0)`,
                        }}
                      >
                        {progress !== '100.00' && (
                          <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none"></div>
                        )}
                      </div>
                    </div>

                    <p className="ml-2 whitespace-nowrap">
                      {formatDate(campagne.closeVoteDate)}
                    </p>
                  </div>

                  <hr className="my-2 border-gray-300" />
                  <div className="flex flex-row items-center justify-around md:max-w-2xl mx-auto w-full">
                    {(campagne.lists as IList[]).map(
                      (list: IList, index: number) => {
                        return (
                          <React.Fragment key={list._id}>
                            <div className="flex flex-col gap-1">
                              <a
                                href={list.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center"
                              >
                                <img
                                  src={`https://vote.eirb.fr/api/public/logos/${list.filename}`}
                                  alt={list.name}
                                  className="w-16 h-16 object-cover rounded-full transition-transform duration-200 hover:scale-105"
                                />
                                <span className="text-center flex flex-row gap-1 justify-center hover:underline mt-1">
                                  {list.trigram}
                                </span>
                              </a>
                            </div>
                            {index < (campagne.lists as IList[]).length - 1 && (
                              <span className="text-xl font-semibold">VS</span>
                            )}
                          </React.Fragment>
                        );
                      }
                    )}
                  </div>
                  <hr className="my-2 border-gray-300" />
                  <button
                    className="w-fit mx-auto"
                    onClick={() => setVote(campagne)}
                  >
                    <div className="flex flex-row justify-center items-center gap-2 bg-bde-gold px-4 py-2 rounded-lg text-lg font-semibold">
                      <img src={VoteIcon} alt="Logout" className="h-5 w-5" />
                      Exprimer mon vote
                      <img src={VoteIcon} alt="Logout" className="h-5 w-5" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
