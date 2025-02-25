import { useState, useEffect } from 'react';

import { ICampagne, IList } from '@/models';

import LocationIcon from '@/assets/icons/location.svg';

interface UpcomingVoteProps {
  campagne: ICampagne;
  onSave: (id: string, updatedCampagne: Partial<ICampagne>) => void;
}

export const UpcomingVote = ({ campagne, onSave }: UpcomingVoteProps) => {
  const formatDate = (dateStr: Date | string): string =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });

  const formatDateFull = (dateStr: Date | string): string =>
    new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const lists = campagne.lists as IList[];
  const getTimeProgress = (
    startDate: Date | string,
    endDate: Date | string
  ): string => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const total = end - start;
    const elapsed = now - start;
    const progress =
      total > 0 ? Math.min(Math.max((elapsed / total) * 100, 0), 100) : 0;
    return progress.toFixed(2);
  };

  const timeProgress = getTimeProgress(campagne.startDate, campagne.endDate);

  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(campagne.desc);
  const [openVoteDate, setOpenVoteDate] = useState(
    new Date(campagne.openVoteDate).toISOString().slice(0, 10)
  );
  const [closeVoteDate, setCloseVoteDate] = useState(
    new Date(campagne.closeVoteDate).toISOString().slice(0, 10)
  );
  const [school, setSchool] = useState(campagne.school);
  const [endDate, setEndDate] = useState(
    new Date(campagne.endDate).toISOString().slice(0, 10)
  );
  const currentDate = new Date().getTime();
  const campaignStartTime = new Date(campagne.startDate).getTime();
  const [startDate, setStartDate] = useState(
    campaignStartTime > currentDate
      ? new Date(campagne.startDate).toISOString().slice(0, 10)
      : ''
  );

  useEffect(() => {
    setDesc(campagne.desc);
    setOpenVoteDate(new Date(campagne.openVoteDate).toISOString().slice(0, 10));
    setCloseVoteDate(
      new Date(campagne.closeVoteDate).toISOString().slice(0, 10)
    );
    setSchool(campagne.school);
    setEndDate(new Date(campagne.endDate).toISOString().slice(0, 10));
    const campaignStartTime = new Date(campagne.startDate).getTime();
    setStartDate(
      campaignStartTime > new Date().getTime()
        ? new Date(campagne.startDate).toISOString().slice(0, 10)
        : ''
    );
  }, [campagne]);

  const handleSave = () => {
    const updatedCampagne: Partial<ICampagne> = {
      desc,
      openVoteDate: new Date(openVoteDate),
      closeVoteDate: new Date(closeVoteDate),
      school,
      endDate: new Date(endDate),
      ...(startDate && { startDate: new Date(startDate) }),
    };
    onSave(campagne._id, updatedCampagne);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg bg-white max-w-4xl min-w-xs w-full md:w-fit h-fit mx-auto">
      <div className="flex flex-col gap-2 items-center w-full">
        {isEditing ? (
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="text-xl font-semibold border rounded p-1 w-full text-center"
          />
        ) : (
          <h2 className="text-xl font-semibold">{campagne.desc}</h2>
        )}
        <div className="flex flex-row w-full justify-between">
          <p className="flex flex-row items-center gap-2">
            <img src={LocationIcon} alt="location icon" className="w-6 h-6" />
            {isEditing ? (
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="border rounded p-1"
              />
            ) : (
              campagne.school
            )}
          </p>
          <p className="px-2 py-1 rounded-lg bg-bde-gold">{campagne.type}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p>
          {new Date(campagne.startDate).getFullYear() ===
          new Date().getFullYear()
            ? formatDate(campagne.startDate)
            : formatDateFull(campagne.startDate)}
          -{' '}
          {new Date(campagne.endDate).getFullYear() === new Date().getFullYear()
            ? formatDate(campagne.endDate)
            : formatDateFull(campagne.endDate)}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-300 h-3 rounded-full transition-all duration-500"
            style={{ width: `${timeProgress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl">Début des votes :</p>
        <p className="text-md">{formatDateFull(campagne.openVoteDate)}</p>
        <p className="text-md">Fin des votes :</p>
        <p className="text-md">{formatDateFull(campagne.closeVoteDate)}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {lists.map((list, index) => (
          <div
            key={`${list._id}-${index}`}
            className="flex flex-col items-center"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}public/logos/${
                list.filename || 'defaultLogo.svg'
              }`}
              alt={list.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <span className="text-sm mt-1">{list.trigram}</span>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col">
            <label className="font-medium">Ouverture des votes :</label>
            <input
              type="date"
              value={openVoteDate}
              onChange={(e) => setOpenVoteDate(e.target.value)}
              className="border rounded p-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Fermeture des votes :</label>
            <input
              type="date"
              value={closeVoteDate}
              onChange={(e) => setCloseVoteDate(e.target.value)}
              className="border rounded p-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Date de fin :</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-1"
            />
          </div>
          {startDate !== '' && (
            <div className="flex flex-col">
              <label className="font-medium">Date de début :</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded p-1"
              />
            </div>
          )}
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Sauvegarder
          </button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-bde-gold text-white px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-300"
        >
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>
    </div>
  );
};
