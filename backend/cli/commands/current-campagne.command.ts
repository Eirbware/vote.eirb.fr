import { Command, CommandRunner } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { CampagneModel } from '../../libs/database/models/campagne.model';

@Command({
  name: 'show-campagne',
  description: 'Display the current active campagne',
})
@Injectable()
export class ShowCampagneCommand extends CommandRunner {
  constructor() {
    super();
  }

  async run(): Promise<void> {
    try {
      const campagne = await CampagneModel.getActiveCampagnes();
      if (campagne) {
        console.log('Current campagne:', campagne);
      } else {
        console.log('No active campagne found.');
      }
    } catch (error) {
      console.error('Error retrieving active campagne:', error);
    }
  }
}
