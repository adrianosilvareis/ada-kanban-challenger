import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';
import { inject, injectable } from 'inversify';

import { TokenService } from '@/login/domain/services/token-services';

@injectable()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  public constructor(
    @inject(TokenService) private readonly service: TokenService,
  ) {}

  async use(request: Request, response: Response, next: (err?: Error) => void): Promise<void> {
    const token = this.extractTokenFromRequest(request);

    if (await this.isTokenValid(token)) {
      next();
      return;
    }

    response.status(StatusCodes.UNAUTHORIZED).send();
  }

  private extractTokenFromRequest(request: Request): unknown {
    return get(request, 'headers.authorization');
  }

  private async isTokenValid(token: unknown): Promise<boolean> {
    if (typeof token !== 'string') {
      return false;
    }
    const sanitizedToken = token.replace(/^bearer/i, '').trim();

    return this.service.validateToken(sanitizedToken);
  }
}
