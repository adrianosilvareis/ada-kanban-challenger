import { injectable } from 'inversify';

import { GetAuthRepository } from '@/login/domain/repositories/get-auth-repository';
import { Auth } from '@/login/domain/entity/auth';
import { getEnvOrThrow } from '@/config/settings';
import { NotFoundError } from '@/http-status/not-found-error';
import { UnauthorizedError } from '@/http-status/unauthorized-error';

@injectable()
export class EnvironmentsAuthRepository implements GetAuthRepository {
  async get(user: string, password: string): Promise<Auth> {
    if (user !== getEnvOrThrow('AUTH_LOGIN')) {
      throw new NotFoundError('User not found');
    }

    if (password !== getEnvOrThrow('AUTH_PASS')) {
      throw new UnauthorizedError('Password does not match');
    }

    return new Auth(user, password);
  }
}
