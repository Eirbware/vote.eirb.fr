import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CampagneService } from './campagne.service';
import { AuthGuard, AdminGuard } from 'libs/core/guards';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { APIError } from 'libs/core/models';

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

  @Get('previous-vote')
  async getPreviousVote() {
    const previousVote = await this.campagneService.getPreviousVote();
    if (!previousVote) {
      return [];
    }
    return previousVote;
  }

  @Get('current-vote-with-result')
  @UseGuards(AdminGuard)
  async getCurrentVoteWithResult() {
    const currentVote = await this.campagneService.getCurrentVoteWithResult();
    if (!currentVote) {
      return [];
    }
    return currentVote;
  }

  @Get('upcoming-vote-without-filter')
  @UseGuards(AdminGuard)
  async getUpcomingVoteWithResult() {
    const upcomingVote =
      await this.campagneService.getUpcomingVoteWithoutFilter();
    if (!upcomingVote) {
      return [];
    }
    return upcomingVote;
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  async updateCampagne(
    @Param('id') id: string,
    @Body() updateCampagneDto: UpdateCampagneDto,
  ) {
    const updatedCampagne = await this.campagneService.updateCampagne(
      id,
      updateCampagneDto,
    );
    if (!updatedCampagne) {
      throw new APIError('CAMPAGNE/NOT_FOUND', 404);
    }
    return updatedCampagne;
  }
}
