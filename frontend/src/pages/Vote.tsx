import { useEffect, useState } from 'react';

import {
  UpcommingVotes,
  NoVotes,
  CurrentVotes,
  VoteComponent,
} from '@components/Vote';
import { ICampagne } from '@/models';
import { useFetchApi } from '@/utils';

export const Vote = () => {
  const [upcommingOrCurrentVotes, setUpcommingOrCurrentVotes] = useState<{
    upcommingVotes: ICampagne[];
    currentVotes: ICampagne[];
  }>({
    upcommingVotes: [],
    currentVotes: [],
  });

  const [selectedVote, setSelectedVote] = useState<ICampagne | null>(null);

  const { fetchApi } = useFetchApi();

  useEffect(() => {
    const getUpcomingVotes = async () => {
      try {
        const response = await fetchApi('campagnes/upcoming-vote');
        setUpcommingOrCurrentVotes((prevState) => ({
          ...prevState,
          upcommingVotes: response,
        }));
      } catch {
        setUpcommingOrCurrentVotes((prevState) => ({
          ...prevState,
          upcommingVotes: [],
        }));
      }

      try {
        const response = await fetchApi('campagnes/current-vote');
        setUpcommingOrCurrentVotes((prevState) => ({
          ...prevState,
          currentVotes: response,
        }));
      } catch {
        setUpcommingOrCurrentVotes((prevState) => ({
          ...prevState,
          currentVotes: [],
        }));
      }
    };

    getUpcomingVotes();
  }, [fetchApi]);

  return (
    <>
      {selectedVote ? (
        <VoteComponent
          campagne={selectedVote}
          onClose={() => setSelectedVote(null)}
        />
      ) : (
        <>
          {upcommingOrCurrentVotes.currentVotes.length === 0 &&
          upcommingOrCurrentVotes.upcommingVotes.length === 0 ? (
            <NoVotes />
          ) : (
            <div className="flex flex-col gap-6">
              <CurrentVotes
                currentVotes={upcommingOrCurrentVotes.currentVotes}
                setVote={setSelectedVote}
              />
              <UpcommingVotes
                upcommingVotes={upcommingOrCurrentVotes.upcommingVotes}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
