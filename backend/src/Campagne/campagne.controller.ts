import { Controller, Get, UseGuards } from '@nestjs/common';
import { CampagneService } from './campagne.service';
import { AuthGuard } from 'libs/core/guards';

@Controller('campagnes')
@UseGuards(AuthGuard)
export class CampagneController {
  constructor(private readonly campagneService: CampagneService) {}

  @Get('upcoming-vote')
  async getUpcomingVote() {
    const upcomingVote = await this.campagneService.getUpcomingVote();
    if (!upcomingVote) {
      return [];
    }
    return upcomingVote;
  }

  @Get('current-vote')
  async getCurrentVote() {
    const currentVote = await this.campagneService.getCurrentVote();
    if (!currentVote) {
      return [];
    }
    return currentVote;
  }
}
