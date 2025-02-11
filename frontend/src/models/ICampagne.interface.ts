import { IList } from './IList.interface';

export enum CampagneType {
  BDE = 'BDE',
  BDS = 'BDS',
  BDA = 'BDA',
  OTHER = 'other',
}

export interface ICampagne {
  readonly _id: string;
  desc: string;
  school: string;
  type: CampagneType;
  startDate: Date;
  endDate: Date;
  openVoteDate: Date;
  closeVoteDate: Date;
  lists: string[] | IList[];
}
