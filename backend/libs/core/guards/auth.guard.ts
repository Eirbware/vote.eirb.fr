import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { APIError, AuthenticatedRequest } from '../models';

interface JwtPayload {
  login: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      return false;
    }

    try {
      const payload: JwtPayload =
        await this.jwtService.verifyAsync<JwtPayload>(token);

      request.login = payload.login;
      request.userData = {
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
      return true;
    } catch {
      throw new APIError('Invalid token', 401);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
