import { Controller, Get, Query } from '@nestjs/common';

import { APIError } from 'libs/core/models';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login-cas')
  async loginCas(
    @Query('ticket') ticket: string,
    @Query('redirectUrl') redirectUrl: string,
  ) {
    if (!ticket || !redirectUrl)
      throw new APIError('Missing ticket or redirectUrl');

    return await this.authService.loginCas(ticket, redirectUrl);
  }
}
