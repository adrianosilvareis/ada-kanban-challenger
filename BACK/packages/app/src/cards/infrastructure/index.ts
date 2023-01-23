import { diContainer } from '@/config/di-container';
import { PostgresCardRepositories } from '@/cards/infrastructure/repositories/postgres-card-repository';
import { ListCardsRepository } from '@/cards/domain/repositories/list-cards-repository';
import { ListCardsController } from '@/cards/infrastructure/controllers/list-cards-controller';
import { AddCardController } from '@/cards/infrastructure/controllers/add-card-controller';
import { AddCardRepository } from '@/cards/domain/repositories/add-card-repository';
import { RemoveCardController } from '@/cards/infrastructure/controllers/remove-card-controller';
import { RemoveCardRepository } from '@/cards/domain/repositories/remove-card-repository';
import { UpdateCardController } from '@/cards/infrastructure/controllers/update-card-controller';
import { UpdateCardRepository } from '@/cards/domain/repositories/update-card-repository';

diContainer.bind(ListCardsController).toSelf();
diContainer.bind(ListCardsRepository).to(PostgresCardRepositories);

diContainer.bind(AddCardController).toSelf();
diContainer.bind(AddCardRepository).to(PostgresCardRepositories);

diContainer.bind(RemoveCardController).toSelf();
diContainer.bind(RemoveCardRepository).to(PostgresCardRepositories);

diContainer.bind(UpdateCardController).toSelf();
diContainer.bind(UpdateCardRepository).to(PostgresCardRepositories);
