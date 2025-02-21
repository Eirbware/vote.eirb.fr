import { Injectable } from '@nestjs/common';

import { CampagneModel } from 'libs/database/models/campagne.model';
import { ListModel } from 'libs/database/models/list.model';
import { UpdateCampagneDto } from './dto/update-campagne.dto';
import { APIError } from 'libs/core/models';
import { CreateCampagneDto } from './dto/create-campagne.dto';

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

  async createCampagne(createCampagneDto: CreateCampagneDto) {
    const listIds: string[] = [];

    try {
      for (const list of JSON.parse(createCampagneDto.lists || '[]')) {
        const newList = new ListModel(list);
        await newList.save();
        listIds.push(newList._id.toString());
      }

      const newCampagne = new CampagneModel({
        ...createCampagneDto,
        lists: listIds,
      });

      await newCampagne.save();
      return newCampagne.populate('lists');
    } catch (error) {
      await Promise.all(listIds.map((id) => ListModel.deleteOne({ _id: id })));
      throw error;
    }
  }
}
