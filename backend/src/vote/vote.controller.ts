import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'libs/core/guards';

import { VoteService } from './vote.service';
import { AuthenticatedRequest } from 'libs/core/models';

@Controller('vote')
@UseGuards(AuthGuard)
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get('has-vote/:campagneId')
  async hasVote(
    @Req() req: AuthenticatedRequest,
    @Param('campagneId') campagneId: string,
  ) {
    return await this.voteService.hasVote(campagneId, req.login);
  }

  @Post('vote-for/:listId')
  async voteFor(
    @Req() req: AuthenticatedRequest,
    @Param('listId') listId: string,
    @Body() body: { campagneId: string },
  ) {
    return await this.voteService.voteFor(listId, body.campagneId, req.login);
  }
}
