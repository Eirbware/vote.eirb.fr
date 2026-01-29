import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { CASResponse, APIError } from 'libs/core/models';
import { AdminModel } from 'libs/database/models/admin.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private async fetchCasData(ticket: string, redirectUrl: string) {
    const CAS_PROXY_URL = 'https://cas.serveur-bde.eirb.fr/?token=';
    const serviceUrl = `${CAS_PROXY_URL}${redirectUrl}`;
    const casUrl = `https://cas.bordeaux-inp.fr/serviceValidate?service=${encodeURIComponent(
      serviceUrl,
    )}&ticket=${ticket}&format=json`;

    try {
      const response = await axios.get<CASResponse>(casUrl);

      const data: CASResponse = response.data;

      if (!data.serviceResponse.authenticationSuccess) {
        throw new APIError('CAS/LOGIN_FAILED', 401);
      }

      return data.serviceResponse.authenticationSuccess;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError('CAS/REQUEST_FAILED', 500, error);
    }
  }

  async loginCas(ticket: string, redirectUrl: string) {
    const userData = await this.fetchCasData(ticket, redirectUrl)

		if (userData.attributes.diplome === undefined){
			throw new APIError('CAS/NOT_STUDENT');
		}

		const yearStr = userData.attributes.diplome[0].at(-1)

		if (yearStr === undefined){
			throw new APIError('CAS/NOT_RIGHT_YEAR');
		}

		const year = parseInt(yearStr)

		if (year > 5 || year < 3){
			throw new APIError('CAS/NOT_RIGHT_YEAR');
		}

    if (!userData.attributes.ecole.includes('enseirb-matmeca')) {
      throw new APIError('CAS/NOT_RIGHT_SCHOOL', 403);
    }

    return {
      jwt: this.jwtService.sign({
        login: userData.user,
        firstName: userData.attributes.prenom.join(' '),
        lastName: userData.attributes.nom.join(' '),
      }),
    };
  }

  async isAdmin(login: string) {
    const admin = await AdminModel.findOne({ login });
    return !!admin;
  }
}
