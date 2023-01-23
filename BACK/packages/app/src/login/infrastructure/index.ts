import { diContainer } from '@/config/di-container';
import { GetAuthRepository } from '@/login/domain/repositories/get-auth-repository';
import { EnvironmentsAuthRepository } from '@/login/infrastructure/repositories/environments-auth-repository';
import { LoginController } from '@/login/infrastructure/controllers/login-controller';
import { TokenService } from '@/login/domain/services/token-services';
import { JWTTokenServices } from '@/login/infrastructure/services/jwt-token-services';
import { AuthenticationMiddleware } from '@/login/infrastructure/middlewares/authentication-middleware';

diContainer.bind(AuthenticationMiddleware).toSelf();
diContainer.bind(LoginController).toSelf();
diContainer.bind(GetAuthRepository).to(EnvironmentsAuthRepository);
diContainer.bind(TokenService).to(JWTTokenServices);
