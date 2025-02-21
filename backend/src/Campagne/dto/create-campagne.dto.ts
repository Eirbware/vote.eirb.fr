import { IsNotEmpty, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { CampagneType } from 'libs/database/models/campagne.model';

export class CreateCampagneDto {
  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  school: string;

  @IsNotEmpty()
  @IsEnum(CampagneType)
  type: CampagneType;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsDateString()
  openVoteDate: string;

  @IsNotEmpty()
  @IsDateString()
  closeVoteDate: string;

  @IsOptional()
  lists?: string;
}
