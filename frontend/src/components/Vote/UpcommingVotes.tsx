import { ICampagne, IList } from '@/models';

import LocationIcon from '@/assets/icons/location.svg';
import InfoIcon from '@/assets/icons/info.svg';
import LinkIcon from '@/assets/icons/link.svg';

interface UpcommingVotesProps {
  upcommingVotes: ICampagne[];
}

export const UpcommingVotes = ({ upcommingVotes }: UpcommingVotesProps) => {
  const today = new Date();

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
      year: 'numeric',
    });
  };

  return (
    <>
      {upcommingVotes && upcommingVotes.length > 0 && (
        <div>
          <h1 className="text-2xl font-semibold my-4">Les prochains votes</h1>
          <div>
            {upcommingVotes.map((campagne) => {
              const daysBeforeVote = Math.floor(
                (new Date(campagne.openVoteDate).getTime() - today.getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              const progress = getProgress(
                campagne.startDate,
                campagne.endDate
              );

              return (
                <div
                  key={campagne._id}
                  className="flex flex-col border border-gray-300 rounded-lg p-4 gap-2 md:max-w-4xl mx-auto"
                >
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-lg flex flex-row gap-2 items-center">
                      <img src={LocationIcon} className="h-8 w-8" />
                      {campagne.school}
                    </p>
                    <p className="bg-bde-gold px-2 py-1 text-lg rounded-xl">
                      {campagne.type}
                    </p>
                  </div>
                  <h2 className="text-center text-xl font-medium">
                    {campagne.desc}
                  </h2>
                  <hr className="my-2 border-gray-300" />
                  <div className="flex flex-row justify-between">
                    <p>du {formatDate(campagne.startDate)} </p>
                    <p>au {formatDate(campagne.endDate)}</p>
                  </div>

                  <div className="w-full border border-gray-300 rounded-3xl bg-gray-100">
                    <div
                      className="relative overflow-hidden h-3 rounded-3xl transition-all duration-500 bg-green-300"
                      style={{
                        width: `${progress}%`,
                      }}
                    >
                      {progress !== '100.00' && (
                        <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none"></div>
                      )}
                    </div>
                  </div>

                  <hr className="my-2 border-gray-300" />

                  <div className="flex flex-row items-center justify-around md:max-w-2xl mx-auto w-full">
                    {(campagne.lists as IList[]).map(
                      (list: IList, index: number) => {
                        return (
                          <>
                            <div className="flex flex-col gap-1" key={list._id}>
                              <a
                                href={list.site}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center"
                              >
                                <img
                                  src={`/logos/lists/${list.filename}`}
                                  alt={list.name}
                                  className="w-16 h-16 object-cover rounded-full transition-transform duration-200 hover:scale-105"
                                />
                                <span className="text-center flex flex-row gap-1 justify-center hover:underline mt-1 ml-3">
                                  {list.trigram}
                                  <img
                                    src={LinkIcon}
                                    className="w-3 h-3"
                                    alt="Lien"
                                  />
                                </span>
                              </a>
                            </div>
                            {index < (campagne.lists as IList[]).length - 1 && (
                              <span className="text-xl font-semibold">VS</span>
                            )}
                          </>
                        );
                      }
                    )}
                  </div>

                  <hr className="my-2 border-gray-300" />

                  <p className="flex flex-row gap-2 items-center text-md">
                    <img src={InfoIcon} className="h-8 w-8" />
                    {daysBeforeVote} jours avant l'ouverture des votes
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
