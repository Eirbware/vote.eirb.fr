import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { AdminModel } from '../../libs/database/models/admin.model';

import * as adminsDataRaw from '../../data/admins.json';

@Command({
  name: 'seed-admin',
  description: 'Seed the database with some data',
})
@Injectable()
export class SeedAdminDbCommand extends CommandRunner {
  async run(): Promise<void> {
    try {
      for (const admin of adminsDataRaw) {
        const existAdmin = await AdminModel.findOne({ login: admin.login });
        if (existAdmin) {
          continue;
        }
        const newAdmin = new AdminModel(admin);
        await newAdmin.save();
      }

      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}
