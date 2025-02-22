import PollIcon from '@assets/icons/poll.svg';
import MedalIcon from '@assets/icons/medal.svg';

export const NoVotes = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="rounded-lg shadow-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Aucune campagne n'est actuellement en cours
        </h1>
        <h2 className="text-lg text-gray-600 mb-6">
          Vous pouvez consulter les résultats des années précedents juste ici :
        </h2>
        <a
          href="/results"
          className="bg-[#ffdd03] flex items-center justify-center gap-2 px-4 py-2 text-black font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-[#ffd700]"
        >
          <img src={PollIcon} alt="Résultats" className="h-6 w-auto" />
          <span>Résultats</span>
          <img src={MedalIcon} alt="Résultats" className="h-6 w-auto" />
        </a>
      </div>
    </div>
  );
};
