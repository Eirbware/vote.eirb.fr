import { useState } from 'react';
import { CampagneType } from '@/models';
import { useFetchApi } from '@/utils';

interface CampagneFormData {
  desc: string;
  type: CampagneType;
  school: string;
  startDate: Date;
  endDate: Date;
  openVoteDate: Date;
  closeVoteDate: Date;
  lists: {
    name: string;
    trigram: string;
    site: string;
    file: File | null;
    filename?: string;
  }[];
}

export const CreateCampagne = () => {
  const [formData, setFormData] = useState<CampagneFormData>({
    desc: '',
    type: CampagneType.BDE,
    school: 'Enseirb-Matmeca',
    startDate: new Date(),
    endDate: new Date(),
    openVoteDate: new Date(),
    closeVoteDate: new Date(),
    lists: [],
  });
  const { fetchApi } = useFetchApi();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (
      name === 'startDate' ||
      name === 'endDate' ||
      name === 'openVoteDate' ||
      name === 'closeVoteDate'
    ) {
      setFormData({ ...formData, [name]: new Date(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddList = () => {
    setFormData({
      ...formData,
      lists: [
        ...formData.lists,
        { name: '', trigram: '', site: '', file: null },
      ],
    });
  };

  const handleListChange = (
    index: number,
    field: keyof CampagneFormData['lists'][number],
    value: string | File | null
  ) => {
    const newLists = formData.lists.map((list, i) =>
      i === index ? { ...list, [field]: value } : list
    );
    setFormData({ ...formData, lists: newLists });
  };

  const handleRemoveList = (index: number) => {
    const newLists = formData.lists.filter((_, i) => i !== index);
    setFormData({ ...formData, lists: newLists });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submittedFormData = new FormData();
    submittedFormData.append('desc', formData.desc);
    submittedFormData.append('school', formData.school);
    submittedFormData.append('type', formData.type);
    submittedFormData.append('startDate', formData.startDate.toISOString());
    submittedFormData.append('endDate', formData.endDate.toISOString());
    submittedFormData.append(
      'openVoteDate',
      formData.openVoteDate.toISOString()
    );
    submittedFormData.append(
      'closeVoteDate',
      formData.closeVoteDate.toISOString()
    );
    const listsData = formData.lists.map((list) => {
      if (list.file) {
        const fileExtension = list.file.name.split('.').pop();
        list.filename = `${list.trigram}_logo.${fileExtension}`;
      }
      return {
        name: list.name,
        trigram: list.trigram,
        site: list.site,
        filename: list.filename,
      };
    });
    submittedFormData.append('lists', JSON.stringify(listsData));
    formData.lists.forEach((list) => {
      if (list.file) {
        const fileExtension = list.file.name.split('.').pop();
        submittedFormData.append(
          `${list.trigram}_logo`,
          list.file,
          `${list.trigram}_logo.${fileExtension}`
        );
      }
    });

    const campagne = await fetchApi(
      'campagnes/create',
      'POST',
      true,
      submittedFormData
    );

    // TODO: add campagne to the context

    if (campagne) {
      setFormData({
        desc: '',
        type: CampagneType.BDE,
        school: 'Enseirb-Matmeca',
        startDate: new Date(),
        endDate: new Date(),
        openVoteDate: new Date(),
        closeVoteDate: new Date(),
        lists: [],
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border rounded-lg shadow-lg bg-white max-w-4xl w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Créer une campagne</h2>
      <div className="flex flex-col">
        <label className="font-medium">Description</label>
        <input
          type="text"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          placeholder='Ex: "Campagne BDE 2025"'
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">École</label>
        <input
          type="text"
          name="school"
          value={formData.school}
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as CampagneType })
          }
          className="border rounded p-2 w-full"
          required
        >
          <option value={CampagneType.BDE}>BDE</option>
          <option value={CampagneType.BDS}>BDS</option>
          <option value={CampagneType.BDA}>BDA</option>
          <option value={CampagneType.OTHER}>Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Date de début</label>
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Date de fin</label>
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Ouverture des votes</label>
        <input
          type="date"
          name="openVoteDate"
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Fermeture des votes</label>
        <input
          type="date"
          name="closeVoteDate"
          onChange={handleChange}
          className="border rounded p-2 w-full"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Listes associées</label>
        {formData.lists.map((list, index) => (
          <div key={index} className="p-2 border rounded mb-2">
            <div className="flex flex-col mb-2">
              <label className="text-sm">Nom</label>
              <input
                type="text"
                value={list.name}
                onChange={(e) =>
                  handleListChange(index, 'name', e.target.value)
                }
                className="border rounded p-1 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-sm">Trigram</label>
              <input
                type="text"
                value={list.trigram}
                onChange={(e) =>
                  handleListChange(index, 'trigram', e.target.value)
                }
                className="border rounded p-1 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-sm">Site</label>
              <input
                type="text"
                value={list.site}
                onChange={(e) =>
                  handleListChange(index, 'site', e.target.value)
                }
                className="border rounded p-1 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-sm">Fichier</label>
              <input
                type="file"
                onChange={(e) =>
                  handleListChange(
                    index,
                    'file',
                    e.target.files ? e.target.files[0] : null
                  )
                }
                className="border rounded p-1 w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveList(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Supprimer
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddList}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Ajouter une liste
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Créer la campagne
      </button>
    </form>
  );
};
