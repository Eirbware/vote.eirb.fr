import { useEffect, useState } from 'react';

import { UpcommingVotes, NoVotes } from '@components/Vote';
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
    };

    getUpcomingVotes();
  }, [fetchApi]);

  return (
    <>
      {upcommingOrCurrentVotes.currentVotes.length === 0 &&
      upcommingOrCurrentVotes.upcommingVotes.length === 0 ? (
        <NoVotes />
      ) : (
        <UpcommingVotes
          upcommingVotes={upcommingOrCurrentVotes.upcommingVotes}
        />
      )}
    </>
  );
};
