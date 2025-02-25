import { ICampagne, IList } from '@/models';

interface ResultCampagneProps {
  campagne: ICampagne;
}

export const ResultCampagne = ({ campagne }: ResultCampagneProps) => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('fr-FR', options);
  };

  const lists = campagne.lists as IList[];
  const maxVotes =
    lists.length > 0
      ? Math.max(...lists.map((list) => list.votesCount || 0))
      : 1;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 my-4">
      <h2 className="text-2xl font-bold mb-2">{campagne.desc}</h2>
      <div className="text-gray-600 mb-4">
        <p>
          <span className="font-semibold">Type :</span> {campagne.type}
        </p>
        <p>
          <span className="font-semibold">École :</span> {campagne.school}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <p className="text-gray-600">
          <span className="font-semibold">Début :</span>{' '}
          {formatDate(campagne.startDate)}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Fin :</span>{' '}
          {formatDate(campagne.endDate)}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Listes</h3>
        <div className="flex flex-wrap gap-4">
          {lists.map((list) => (
            <div key={list._id} className="flex flex-col items-center">
              <a
                href={list.site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <img
                  src={`https://vote.eirb.fr/api/public/logos/${list.filename}`}
                  alt={list.name}
                  className="w-16 h-16 object-cover rounded-full border border-gray-200 transition-transform duration-200 hover:scale-105"
                />
                <div className="flex items-center mt-1">
                  <span className="text-sm font-medium">{list.trigram}</span>
                </div>
              </a>
              <p className="text-xs text-gray-500 mt-1">{list.name}</p>
              <p className="text-xs text-gray-500">{list.votesCount} votes</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Scores</h3>
        <div className="flex flex-col gap-2">
          {lists.map((list) => {
            const percentage =
              maxVotes > 0 ? ((list?.votesCount || 0) / maxVotes) * 100 : 0;
            return (
              <div key={list._id} className="flex items-center gap-2">
                <span className="w-16 text-sm font-medium">{list.trigram}</span>
                <div className="w-full bg-gray-200 h-4 rounded">
                  <div
                    className="bg-bde-gold h-4 rounded"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-16 text-right text-sm">
                  {list.votesCount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
