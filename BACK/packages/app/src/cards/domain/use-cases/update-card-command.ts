import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { UpdateCardRepository } from '@/cards/domain/repositories/update-card-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { Card } from '@/cards/domain/entities/card';

@injectable()
export class UpdateCardCommand extends Commands<Card> {
  public constructor(
    @inject(UpdateCardRepository) private readonly repository: UpdateCardRepository,
  ) {
    super();
  }

  async execute(params: Card): Promise<void> {
    try {
      const card = await this.repository.update(params);
      this.emit('Success', card);
    } catch (error: unknown) {
      if (error instanceof NotFoundError) {
        this.emit('NotFoundError', error.message);
        return;
      }

      const e: Error = error as Error;
      this.emit('InternalServerError', e.message);
    }
  }
}
