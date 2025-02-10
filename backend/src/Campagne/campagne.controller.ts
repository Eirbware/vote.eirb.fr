import { Controller, Get } from '@nestjs/common';
import { CampagneService } from './campagne.service';

@Controller('campagne')
export class CampagneController {
  constructor(private readonly campagneService: CampagneService) {}

  @Get('actives')
  async getActiveCampagnes() {
    const campagnes = await this.campagneService.getActiveCampagnes();
    if (!campagnes) {
      return [];
    }
    return campagnes;
  }
}
