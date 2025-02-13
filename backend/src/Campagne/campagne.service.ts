import { Injectable } from '@nestjs/common';

import { CampagneModel } from 'libs/database/models/campagne.model';

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
      closeVoteDate: { $lt: new Date() },
    }).populate('lists');
  }
}
