import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { APIError, AuthenticatedRequest } from 'libs/core/models';

import { AuthService } from './auth.service';
import { AuthGuard } from 'libs/core/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  async login(
    @Query('redirectUrl') redirectUrl: string,
  ) {
    if (!redirectUrl)
      throw new APIError('Missing redirectUrl');

    return await this.authService.login(redirectUrl);
  }

	@Get('verify-login')
	async verifyLogin(
		@Query('currentUrl') currentUrl: string,
		@Query('code_verifier') code_verifier: string,
		@Query('state') state: string,
	) {
		
		const currentUrlObject = new URL(currentUrl)
		return await this.authService.verifyLogin(currentUrlObject, code_verifier, state);
	}

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req: AuthenticatedRequest) {
    return {
      login: req.login,
      admin: await this.authService.isAdmin(req.login),
      userData: req.userData,
    };
  }
}
