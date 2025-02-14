import { Injectable } from '@nestjs/common';

import { CampagneModel } from 'libs/database/models/campagne.model';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { APIError } from 'libs/core/models';

@Injectable()
export class CampagneService {
  async getUpcomingVote() {
    return CampagneModel.find({
      startDate: { $lt: new Date() },
      openVoteDate: { $gt: new Date() },
    }).populate({
      path: 'lists',
      select: '-votesCount',
    });
  }

  async getCurrentVote() {
    return CampagneModel.find({
      openVoteDate: { $lt: new Date() },
      closeVoteDate: { $gt: new Date() },
    })
      .populate({
        path: 'lists',
        select: '-votesCount',
      })
      .sort({ closeVoteDate: 1 });
  }

  async getPreviousVote() {
    return CampagneModel.find({
      closeVoteDate: {
        $lt: new Date(new Date().setDate(new Date().getDate() + 3)),
      },
    }).populate('lists');
  }

  async getCurrentVoteWithResult() {
    return CampagneModel.find({
      openVoteDate: { $lt: new Date() },
      closeVoteDate: { $gt: new Date() },
    })
      .populate('lists')
      .sort({ closeVoteDate: 1 });
  }

  async getUpcomingVoteWithoutFilter() {
    return CampagneModel.find({
      openVoteDate: { $gt: new Date() },
    }).populate({
      path: 'lists',
      select: '-votesCount',
    });
  }

  async updateCampagne(id: string, updateCampagneDto: UpdateCampagneDto) {
    const campagne = await CampagneModel.findById(id);
    if (!campagne) {
      throw new APIError('CAMPAGNE/NOT_FOUND');
    }

    if (
      new Date(campagne.startDate) <= new Date() &&
      updateCampagneDto.startDate
    ) {
      delete updateCampagneDto.startDate;
    }

    Object.assign(campagne, updateCampagneDto);
    await campagne.save();
    return campagne.populate('lists');
  }
}
