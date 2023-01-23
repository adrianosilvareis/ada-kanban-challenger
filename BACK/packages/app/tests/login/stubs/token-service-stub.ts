import { Auth } from '@/login/domain/entity/auth';
import { Token, TokenService } from '@/login/domain/services/token-services';

export class TokenServiceStub implements TokenService {
  public token: Token = '';

  public isValid: boolean = true;

  public callback!: () => void;

  // eslint-disable-next-line no-unused-vars
  async generateToken(_auth: Auth): Promise<string> {
    this.callback();
    return Promise.resolve(this.token);
  }

  // eslint-disable-next-line no-unused-vars
  async validateToken(_token: string): Promise<boolean> {
    this.callback();
    return Promise.resolve(this.isValid);
  }
}
