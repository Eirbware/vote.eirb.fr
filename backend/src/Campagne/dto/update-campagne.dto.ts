import { IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class UpdateCampagneDto {
  @IsOptional()
  @IsNotEmpty({ message: 'CAMPAGNE/UPDATE_MISSING_DESC' })
  desc?: string;

  @IsOptional()
  @IsDateString({}, { message: 'CAMPAGNE/UPDATE_INVALID_OPEN_VOTE_DATE' })
  openVoteDate?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'CAMPAGNE/UPDATE_MISSING_SCHOOL' })
  school?: string;

  @IsOptional()
  @IsDateString({}, { message: 'CAMPAGNE/UPDATE_INVALID_END_DATE' })
  endDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'CAMPAGNE/UPDATE_INVALID_START_DATE' })
  startDate?: string;
}
