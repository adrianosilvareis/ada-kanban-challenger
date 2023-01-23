import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { GetAuthRepository } from '@/login/domain/repositories/get-auth-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { UnauthorizedError } from '@/http-status/unauthorized-error';
import { TokenService } from '@/login/domain/services/token-services';

export interface LoginParams {
  login: string
  senha: string
}

@injectable()
export class MakeLoginCommand extends Commands<LoginParams> {
  public constructor(
    @inject(GetAuthRepository) private readonly repository: GetAuthRepository,
    @inject(TokenService) private readonly service: TokenService,
  ) {
    super();
  }

  async execute(params: LoginParams): Promise<void> {
    try {
      const auth = await this.repository.get(params.login, params.senha);

      const token = await this.service.generateToken(auth);

      this.emit('Success', `Bearer ${token}`);
    } catch (e: unknown) {
      const error: Error = e as Error;
      if (error instanceof NotFoundError) {
        this.emit('NotFoundError', error.message);
        return;
      }
      if (error instanceof UnauthorizedError) {
        this.emit('UnauthorizedError', error.message);
        return;
      }
      this.emit('InternalServerError', error.message);
    }
  }
}
