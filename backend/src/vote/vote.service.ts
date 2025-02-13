import { Injectable } from '@nestjs/common';

import { VoteModel } from 'libs/database/models/vote.model';
import { ListModel } from 'libs/database/models/list.model';

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
    await VoteModel.create({ login, campagneId });
    await ListModel.updateOne({ _id: listId }, { $inc: { votesCount: 1 } });
    return { success: true };
  }
}
