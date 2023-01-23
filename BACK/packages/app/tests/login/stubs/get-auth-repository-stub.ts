import { Auth } from '@/login/domain/entity/auth';
import { GetAuthRepository } from '@/login/domain/repositories/get-auth-repository';

export class GetAuthRepositoryStub implements GetAuthRepository {
  public callback!: () => void;

  async get(login: string, password: string): Promise<Auth> {
    this.callback();
    return new Auth(login, password);
  }
}
