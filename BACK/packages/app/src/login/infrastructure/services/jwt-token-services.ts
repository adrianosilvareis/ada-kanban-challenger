import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { getEnvOrDefault, getEnvOrThrow } from '@/config/settings';
import { Auth } from '@/login/domain/entity/auth';
import { TokenService } from '@/login/domain/services/token-services';

@injectable()
export class JWTTokenServices implements TokenService {
  async generateToken(auth: Auth): Promise<string> {
    const secret = getEnvOrThrow('JWT_SECRET');
    const expiresIn = getEnvOrDefault('JWT_EXPIRE', '1h');

    return jwt.sign({
      data: auth,
    }, secret, { expiresIn });
  }

  async validateToken(token: string): Promise<boolean> {
    const secret = getEnvOrThrow('JWT_SECRET');
    try {
      jwt.verify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  }
}
