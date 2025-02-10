import { Injectable } from '@nestjs/common';

import { CampagneModel } from 'libs/database/models/campagne.model';

@Injectable()
export class CampagneService {
  async getActiveCampagnes() {
    return CampagneModel.getActiveCampagnes();
  }
}
