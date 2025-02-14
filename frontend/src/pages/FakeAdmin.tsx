import { useEffect, useState } from 'react';
import { ICampagne, IList } from '@/models';
import { useFetchApi } from '@/utils';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
}

export const FakeAdmin = () => {
  const [currentVote, setCurrentVote] = useState<ICampagne[]>([]);
  const seed = 'klbdsakfu1973bkaf01nk';
  const { fetchApi } = useFetchApi();

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const getCurrentVote = async () => {
      try {
        const response = await fetchApi('campagnes/current-vote');
        setCurrentVote(response);
      } catch {
        setCurrentVote([]);
      }
    };

    getCurrentVote();
  }, [fetchApi]);

  const computeTCurrent = (campagne: ICampagne): number => {
    const openTime = new Date(campagne.openVoteDate).getTime();
    const closeTime = new Date(campagne.closeVoteDate).getTime();
    const todayTime = new Date().getTime();
    const effectiveEndTime = todayTime < closeTime ? todayTime : closeTime;
    return (effectiveEndTime - openTime) / (closeTime - openTime);
  };

  const getFakeVote = (list: IList): number => {
    return Math.floor(125 + seededRandom(seed + list._id) * 125);
  };

  const getFinalScoreForList = (campagne: ICampagne, list: IList): number => {
    const tCurrent = computeTCurrent(campagne);
    const finalVote = getFakeVote(list);
    const tProgress = Math.log(1 + 9 * tCurrent) / Math.log(10);
    return Math.round(finalVote * tProgress);
  };

  const renderFakeGraph = (campagne: ICampagne) => {
    const lists = campagne.lists as IList[];
    if (!lists || lists.length === 0) return null;

    const tCurrent = computeTCurrent(campagne);
    const numPoints = 5;
    const openTime = new Date(campagne.openVoteDate).getTime();
    const closeTime = new Date(campagne.closeVoteDate).getTime();
    const todayTime = new Date().getTime();
    const effectiveEndTime = todayTime < closeTime ? todayTime : closeTime;
    const step = (effectiveEndTime - openTime) / (numPoints - 1);
    const labels = [];
    for (let i = 0; i < numPoints; i++) {
      labels.push(
        new Date(openTime + i * step).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
        })
      );
    }

    const datasets = lists.map((list, index) => {
      const finalVote = getFakeVote(list);
      const dataPoints = [];
      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        const u = t * tCurrent;
        const tProgress = Math.log(1 + 9 * u) / Math.log(10);
        dataPoints.push(Math.round(finalVote * tProgress));
      }
      const colors = [
        'rgba(75,192,192,1)',
        'rgba(255,99,132,1)',
        'rgba(54,162,235,1)',
        'rgba(255,206,86,1)',
      ];
      return {
        label: list.trigram,
        data: dataPoints,
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length].replace('1)', '0.2)'),
        fill: false,
        tension: 0.4,
      };
    });

    const computedYMax = Math.max(...datasets.flatMap((ds) => ds.data));
    const yAxisMax = Math.ceil(computedYMax * 1.1);
    const stepSize = Math.ceil(yAxisMax / 10);

    const data = {
      labels,
      datasets,
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: 'top' as const },
        title: {
          display: true,
          text: 'Progression des votes',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: yAxisMax,
          ticks: { stepSize },
          position: 'left' as const,
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl">Admin</h1>

      {currentVote.length === 0 && (
        <h2 className="text-center text-xl my-10">Aucuns votes en cours</h2>
      )}

      {currentVote.map((campagne) => {
        const lists = campagne.lists as IList[];
        if (!lists || lists.length === 0) return null;
        return (
          <div key={campagne._id} className="flex flex-col items-center">
            <hr className="my-4 w-full border-t-2 border-gray-300" />
            <div className="flex flex-col md:flex-row gap-10 w-full">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl">{campagne.desc}</h2>
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>Début:</strong> {formatDate(campagne.startDate)}
                  </p>
                  <p>
                    <strong>Fin:</strong> {formatDate(campagne.endDate)}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Période de vote</p>
                  <p>
                    <strong>Ouverture:</strong>{' '}
                    {formatDate(campagne.openVoteDate)}
                  </p>
                  <p>
                    <strong>Fermeture:</strong>{' '}
                    {formatDate(campagne.closeVoteDate)}
                  </p>
                  <div>
                    <p className="font-medium">Scores :</p>
                    {lists.map((list) => (
                      <p key={list._id}>
                        <strong>{list.trigram}:</strong>{' '}
                        {getFinalScoreForList(campagne, list)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="hidden md:block">
                  {renderFakeGraph(campagne)}
                </div>
                <p className="md:hidden">
                  Pour visualiser le graphe, aller sur PC
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
