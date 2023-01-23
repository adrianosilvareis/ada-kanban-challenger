import { diContainer } from '@/config/di-container';
import { MakeLoginCommand } from '@/login/domain/use-cases/make-login-command';

diContainer.bind(MakeLoginCommand).toSelf();
