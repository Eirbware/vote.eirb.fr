import { ICampagne, IList } from '@/models';

import LocationIcon from '@/assets/icons/location.svg';

interface CurrentVotesProps {
  campagne: ICampagne;
}

export const CurrentVotes = ({ campagne }: CurrentVotesProps) => {
  const formatDate = (dateStr: Date | string): string =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });

  const lists = campagne.lists as IList[];
  const totalVotes = lists.reduce(
    (sum, list) => sum + (list.votesCount || 0),
    0
  );

  const getVoteProgress = (
    openDate: Date | string,
    closeDate: Date | string
  ): string => {
    const start = new Date(openDate).getTime();
    const end = new Date(closeDate).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
    const progress =
      total > 0 ? Math.min(Math.max((elapsed / total) * 100, 0), 100) : 0;
    return progress.toFixed(2);
  };

  const voteProgress = getVoteProgress(
    campagne.openVoteDate,
    campagne.closeVoteDate
  );

  return (
    <div className="flex flex-col gap-2 p-6 border rounded-lg shadow-lg bg-white max-w-4xl w-full md:w-fit h-fit mx-auto">
      <div className="flex flex-row items-center justify-between gap-6">
        <h2 className="text-xl font-semibold">{campagne.desc}</h2>
        <p className="bg-bde-gold px-2 py-1 rounded-lg">
          <strong>{campagne.type}</strong>
        </p>
      </div>
      <p className="flex flex-row gap-2">
        <img src={LocationIcon} alt="location icon" className="w-6 h-6" />{' '}
        {campagne.school}
      </p>

      <div className="flex flex-col items-center ">
        <p className="text-lg mb-2">Date des votes</p>
        <div className="flex flex-row items-center gap-2 w-full">
          <span className="text-sm">{formatDate(campagne.openVoteDate)}</span>
          <div className="flex-1 border border-gray-300 rounded-3xl bg-gray-100">
            <div
              className="relative overflow-hidden h-3 rounded-3xl transition-all duration-500"
              style={{
                width: `${voteProgress}%`,
                background: `rgb(${(255 * Number(voteProgress)) / 100}, ${
                  255 - (255 * Number(voteProgress)) / 100
                }, 0)`,
              }}
            >
              {voteProgress !== '100.00' && (
                <div className="absolute top-0 left-0 w-full h-full shimmer pointer-events-none"></div>
              )}
            </div>
          </div>
          <span className="text-sm">{formatDate(campagne.closeVoteDate)}</span>
        </div>
      </div>

      <h3 className="text-xl mt-2">Listes associées</h3>
      <ul className="space-y-3">
        {lists.map((list) => (
          <li
            key={list._id}
            className="flex items-center gap-4 p-3 border rounded-lg"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}public/logos/${list.filename}`}
              alt={list.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <p className="font-medium">
                {list.name} ({list.trigram})
              </p>
              <p className="text-sm text-gray-600">Votes : {list.votesCount}</p>
              <a
                href={list.site}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline"
              >
                Voir le site
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div>
        <h3 className="text-xl mt-2">Graphique des votes</h3>
        {lists.map((list) => {
          const percentage =
            totalVotes > 0 ? ((list.votesCount || 0) / totalVotes) * 100 : 0;
          return (
            <div key={list._id} className="mb-4">
              <p className="font-medium">
                {list.name} ({list.votesCount} votes)
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
