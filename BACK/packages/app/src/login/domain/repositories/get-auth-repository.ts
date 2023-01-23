import { Auth } from '@/login/domain/entity/auth';

export abstract class GetAuthRepository {
  abstract get(user: string, password: string): Promise<Auth>
}
