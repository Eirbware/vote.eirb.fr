import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CampagneService } from './campagne.service';
import { AuthGuard, AdminGuard } from 'libs/core/guards';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { APIError } from 'libs/core/models';
import { CreateCampagneDto } from './dto/create-campagne.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

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

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: join(__dirname, '..', '..', '..', 'public', 'logos'),
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async createCampagne(@Body() createCampagneDto: CreateCampagneDto) {
    return await this.campagneService.createCampagne(createCampagneDto);
  }
}
