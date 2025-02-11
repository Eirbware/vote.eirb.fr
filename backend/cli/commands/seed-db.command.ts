import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { CampagneModel } from '../../libs/database/models/campagne.model';
import { ListModel } from '../../libs/database/models/list.model';

import * as listsDataRaw from '../../data/lists.json';
import * as campagnesDataRaw from '../../data/campagnes.json';

type CampagneSeed = {
  desc: string;
  school: string;
  type: string;
  startDate: string;
  endDate: string;
  openVoteDate: string;
  closeVoteDate: string;
  lists: string[];
};

@Command({
  name: 'seed-db',
  description: 'Seed the database with some data',
})
@Injectable()
export class SeedDbCommand extends CommandRunner {
  async run(): Promise<void> {
    try {
      const listIds: string[] = [];

      for (const list of listsDataRaw) {
        const newList = new ListModel(list);
        const savedList = await newList.save();
        listIds.push(savedList._id.toString());
      }

      const campagnesData = campagnesDataRaw as CampagneSeed[];

      for (const campagneData of campagnesData) {
        campagneData.lists = listIds;
        const newCampagne = new CampagneModel(campagneData);
        await newCampagne.save();
      }

      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}
