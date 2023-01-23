import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { ListCardsRepository } from '@/cards/domain/repositories/list-cards-repository';

@injectable()
export class ListCardsCommand extends Commands {
  public constructor(
    @inject(ListCardsRepository) private readonly repository: ListCardsRepository,
  ) {
    super();
  }

  async execute(): Promise<void> {
    try {
      const list = await this.repository.list();
      this.emit('Success', list);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
