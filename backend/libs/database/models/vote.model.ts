import {
  getModelForClass,
  index,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Campagne } from './campagne.model';
import { Types } from 'mongoose';

@index({ login: 1, campagne: 1 }, { unique: true })
export class Vote {
  readonly _id!: Types.ObjectId;

  @prop({ type: String, required: true })
  login!: string;

  @prop({ ref: () => Campagne, required: true })
  campagne!: Campagne;
}

export type VoteModelType = ReturnModelType<typeof Vote>;
export const VoteModel = getModelForClass(Vote);
