import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { List } from './list.model';

export enum CampagneType {
  BDE = 'BDE',
  BDS = 'BDS',
  BDA = 'BDA',
  OTHER = 'other',
}

export class Campagne {
  readonly _id!: Types.ObjectId;

  @prop({ type: String, required: true })
  desc!: string;

  @prop({ type: String, required: true, default: 'Enseirb' })
  school!: string;

  @prop({ type: String, enum: CampagneType, required: true })
  type!: CampagneType;

  @prop({ type: Date, required: true })
  startDate!: Date;

  @prop({ type: Date, required: true })
  endDate!: Date;

  @prop({ type: Date, required: true })
  openVoteDate!: Date;

  @prop({ type: Date, required: true })
  closeVoteDate!: Date;

  @prop({ ref: () => List, required: true, default: [] })
  lists!: List[];
}

export type CampagneModelType = ReturnModelType<typeof Campagne>;
export const CampagneModel = getModelForClass(Campagne);
