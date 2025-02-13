import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  login: string;
  userData?: {
    firstName: string;
    lastName: string;
  };
}
