import { Injectable } from '@nestjs/common';

import { VoteModel } from 'libs/database/models/vote.model';
import { ListModel } from 'libs/database/models/list.model';
import { CampagneModel } from 'libs/database/models/campagne.model';

@Injectable()
export class VoteService {
  constructor() {}

  async hasVote(campagneId: string, login: string) {
    const vote = await VoteModel.findOne({ login, campagneId });
    return {
      hasVote: !!vote,
    };
  }

  async voteFor(listId: string, campagneId: string, login: string) {
    const vote = await VoteModel.findOne({ login, campagneId });
    if (vote) {
      return { success: false };
    }

    const campagne = await CampagneModel.findById(campagneId);
    if (
      !campagne ||
      new Date(campagne.closeVoteDate.setHours(23, 59, 59)) < new Date()
    ) {
      return { success: false };
    }

    await VoteModel.create({ login, campagneId });

    await ListModel.updateOne({ _id: listId }, { $inc: { votesCount: 1 } });
    return { success: true };
  }
}
