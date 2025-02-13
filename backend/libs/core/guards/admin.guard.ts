import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AdminModel } from 'libs/database/models/admin.model';

import { APIError, AuthenticatedRequest } from '../models';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const login = request.login;

    if (!login) {
      throw new APIError('ADMIN/NOT_FOUND', 403);
    }

    const admin = await AdminModel.findOne({ login });
    if (!admin) {
      throw new APIError('ADMIN/NOT_ADMIN', 403);
    }

    return true;
  }
}
