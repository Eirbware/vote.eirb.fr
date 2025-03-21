import {
  getModelForClass,
  modelOptions,
  prop,
  ReturnModelType,
} from '@typegoose/typegoose';
import { Campagne } from './campagne.model';
import { Types } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Vote {
  readonly _id!: Types.ObjectId;

  @prop({ type: String, required: true })
  login!: string;

  @prop({ ref: () => Campagne, required: true })
  campagneId!: Campagne;
}

export type VoteModelType = ReturnModelType<typeof Vote>;
export const VoteModel = getModelForClass(Vote);
