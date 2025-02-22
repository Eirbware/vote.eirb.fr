import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { APIError } from '../models';

@Catch(APIError)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: APIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return response.status(exception.statusCode ?? 400).json({
      message: exception.message,
      code: exception.code,
      details: exception.details,
      statusCode: exception.statusCode,
    });
  }
}
