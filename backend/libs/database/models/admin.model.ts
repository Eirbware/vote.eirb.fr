import { getModelForClass, prop, ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class Admin {
  readonly _id!: Types.ObjectId;

  @prop({ type: String, required: true })
  login!: string;

  @prop({ type: Date, required: true })
  endDate!: Date;
}

export type AdminModelType = ReturnModelType<typeof Admin>;
export const AdminModel = getModelForClass(Admin);
