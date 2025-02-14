import { useEffect, useState } from 'react';
import { ICampagne } from '@/models';
import { useFetchApi } from '@/utils';
import { CurrentVotes } from '@/components/Admin/CurrentVotes';
import { UpcomingVote } from '@components/Admin/UpcomingVote';

export const Admin = () => {
  const [currentVotes, setCurrentVotes] = useState<ICampagne[]>([]);
  const [upcomingVotes, setUpcomingVotes] = useState<ICampagne[]>([]);
  const { fetchApi } = useFetchApi();

  useEffect(() => {
    const getVotes = async () => {
      try {
        const response = await fetchApi('campagnes/current-vote-with-result');
        const response2 = await fetchApi(
          'campagnes/upcoming-vote-without-filter'
        );
        setCurrentVotes(response);
        setUpcomingVotes(response2);
      } catch {
        setCurrentVotes([]);
        setUpcomingVotes([]);
      }
    };
    getVotes();
  }, [fetchApi]);

  const handleSaveUpcoming = async (
    id: string,
    updatedCampagne: Partial<ICampagne>
  ) => {
    try {
      const updated = await fetchApi(
        `campagnes/${id}`,
        'PUT',
        true,
        updatedCampagne
      );
      setUpcomingVotes((prev) =>
        prev.map((camp) => (camp._id === id ? { ...camp, ...updated } : camp))
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-center text-3xl">Admin</h1>
      <hr className="my-2 border-gray-300 max-w-3xl w-full" />
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10">
        <div className="flex flex-col md:max-w-[60%] w-full gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-xl">Votes en cours</h1>
            <div className="flex flex-row flex-wrap gap-4 justify-around">
              {currentVotes.map((campagne) => (
                <CurrentVotes key={campagne._id} campagne={campagne} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-center text-xl">Votes à venir</h1>
            <div className="flex flex-row flex-wrap gap-4 justify-around">
              {upcomingVotes.map((campagne) => (
                <UpcomingVote
                  key={campagne._id}
                  campagne={campagne}
                  onSave={handleSaveUpcoming}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <h1 className="text-center text-xl">Créer une campagne</h1>
          {/* Formulaire de création de campagne à ajouter ici */}
        </div>
      </div>
    </div>
  );
};
