import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';

import { Types } from 'mongoose';

export class List {
  readonly _id!: Types.ObjectId;

  @prop({ type: String, required: true })
  name!: string;

  @prop({ type: Number, required: true, default: 0 })
  votesCount!: number;
}

export type ListModelType = ReturnModelType<typeof List>;
export const ListModel = getModelForClass(List);
