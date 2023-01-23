import { Auth } from '@/login/domain/entity/auth';

export type Token = string;

export abstract class TokenService {
  abstract generateToken(auth: Auth): Promise<Token>

  abstract validateToken(token: Token): Promise<boolean>
}
