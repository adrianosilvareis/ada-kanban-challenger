import { diContainer } from '@/config/di-container';
import { ListCardsCommand } from '@/cards/domain/use-cases/list-cards-command';
import { AddCardCommand } from '@/cards/domain/use-cases/add-card-command';
import { RemoveCardCommand } from '@/cards/domain/use-cases/remove-card-command';
import { UpdateCardCommand } from '@/cards/domain/use-cases/update-card-command';

diContainer.bind(AddCardCommand).toSelf();
diContainer.bind(ListCardsCommand).toSelf();
diContainer.bind(RemoveCardCommand).toSelf();
diContainer.bind(UpdateCardCommand).toSelf();
