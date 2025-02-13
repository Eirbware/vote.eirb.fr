import React, { useEffect, useState } from 'react';

import { ICampagne } from '@/models';
import { useFetchApi } from '@/utils';
import { ResultCampagne } from '@/components/Results/ResultCampagne';

export const Results = () => {
  const [previousCampagnesByType, setPreviousCampagnesByType] = useState<{
    [key: string]: ICampagne[];
  }>({});

  const { fetchApi } = useFetchApi();

  useEffect(() => {
    const fetchPreviousCampagnes = async () => {
      try {
        const response = await fetchApi('campagnes/previous-vote');

        const previousCampagnesByType: { [key: string]: ICampagne[] } =
          response.reduce(
            (acc: { [key: string]: ICampagne[] }, campagne: ICampagne) => {
              if (!acc[campagne.type]) {
                acc[campagne.type] = [];
              }
              acc[campagne.type].push(campagne);
              return acc;
            },
            {} as { [key: string]: ICampagne[] }
          );
        setPreviousCampagnesByType(previousCampagnesByType);
      } catch {
        setPreviousCampagnesByType({});
      }
    };

    fetchPreviousCampagnes();
  }, [fetchApi]);

  return (
    <div className="flex flex-col items-center">
      {previousCampagnesByType &&
      Object.keys(previousCampagnesByType).length > 0 ? (
        <>
          <h1 className="text-2xl font-semibold my-4 md:text-center">
            Precedents votes par catégories
          </h1>
          {Object.keys(previousCampagnesByType).map((type) => (
            <React.Fragment key={type}>
              <hr className="w-[50%] border-t border-gray-300 my-4" />
              <h2 className="text-2xl font-semibold my-4 bg-bde-gold px-4 py-2 rounded-lg mr-[75%]">
                {type}
              </h2>
              <div
                key={type}
                className="flex flex-col md:flex-row flex-wrap gap-6 items-left"
              >
                {previousCampagnesByType[type].map((campagne) => (
                  <ResultCampagne key={campagne._id} campagne={campagne} />
                ))}
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="p-8 bg-white rounded-lg shadow-md text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Aucun vote enregistré</h1>
            <p className="text-gray-600">
              Il semblerait que ce soit la première année de ce site et qu'aucun
              vote n'ait encore été enregistré.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
