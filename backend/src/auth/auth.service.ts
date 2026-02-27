import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Configuration, discovery, randomPKCECodeVerifier, calculatePKCECodeChallenge, randomState, buildAuthorizationUrl, authorizationCodeGrant, fetchUserInfo } from 'openid-client';

import { APIError } from 'libs/core/models';
import { AdminModel } from 'libs/database/models/admin.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

	async login(redirectUrl: string) {
		const issuerUrlString: string | undefined = process.env.OIDC_ISSUER
		const clientID: string | undefined = process.env.OIDC_CLIENT_ID
		const clientSecret: string | undefined = process.env.OIDC_CLIENT_SECRET

		if (issuerUrlString == undefined || clientID == undefined || clientSecret == undefined){
			throw new APIError("OIDC/ENV_NOT_SET");
		}

		const issuer: URL = new URL(issuerUrlString);
		const scope: string = "openid profile email"

		const config: Configuration = await discovery(
			issuer,
			clientID,
			clientSecret,
		)

		const code_verifier: string = randomPKCECodeVerifier();
		const code_challenge: string = await calculatePKCECodeChallenge(code_verifier);
		let state: string = ""

		const parameters: Record<string, string> = {
			redirect_uri: redirectUrl,
			scope, 
			code_challenge,
			code_challenge_method: 'S256',
		}

		if (!config.serverMetadata().supportsPKCE()){
			state = randomState()
			parameters.state = state
		}

		const redirectTo: URL = buildAuthorizationUrl(config, parameters);

		return { 
			"redirectUrl": redirectTo.href,
			code_verifier,
			state
		}
	}

	async verifyLogin(currentUrl: URL, code_verifier: string, state: string){
		const issuerUrlString: string | undefined = process.env.OIDC_ISSUER
		const clientID: string | undefined = process.env.OIDC_CLIENT_ID
		const clientSecret: string | undefined = process.env.OIDC_CLIENT_SECRET

		if (issuerUrlString == undefined || clientID == undefined || clientSecret == undefined){
			throw new APIError("OIDC/ENV_NOT_SET");
		}

		const issuer: URL = new URL(issuerUrlString);

		const config: Configuration = await discovery(
			issuer,
			clientID,
			clientSecret,
		)
		const tokens = await authorizationCodeGrant(
			config,
			currentUrl,
			{
				pkceCodeVerifier: code_verifier,
				expectedState: state == "" ? undefined : state, 
				idTokenExpected: true
			}
		)

		const claims = tokens.claims()!
		const userData = await fetchUserInfo(config, tokens.access_token, claims.sub)

		if (userData.ecole !== "enseirb-matmeca"){
			throw new APIError("OIDC/WRONG_SCHOOL");
		}


		if (typeof userData.diplome !== "string"){
			throw new APIError("OIDC/INVALID_ATTRIBUTE")
		}

		const yearStr = userData.diplome.at(-1);

		if (yearStr === undefined){
			throw new APIError("OIDC/TOO_OLD")
		}

		const year = parseInt(yearStr)
		if (year > 5 || year < 3){
			throw new APIError('OIDC/TOO_OLD');
		}

    return {
      jwt: this.jwtService.sign({
        login: userData.uid,
        firstName: userData.prenom,
        lastName: userData.nom,
      }),
    };
	}

  async isAdmin(login: string) {
    const admin = await AdminModel.findOne({ login });
    return !!admin;
  }
}
