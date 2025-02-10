import { CASUser } from './user.interface';

export interface CASResponse {
  serviceResponse: {
    authenticationSuccess?: CASUser;
    authenticationFailure?: {
      code: string;
      description: string;
    };
  };
}
