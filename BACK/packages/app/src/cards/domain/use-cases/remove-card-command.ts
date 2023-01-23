import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { NotFoundError } from '@/http-status/not-found-error';
import { RemoveCardRepository } from '@/cards/domain/repositories/remove-card-repository';

export interface RemoveCardParams {
  id: string
}

@injectable()
export class RemoveCardCommand extends Commands<RemoveCardParams> {
  public constructor(
    @inject(RemoveCardRepository) private readonly repository: RemoveCardRepository,
  ) {
    super();
  }

  async execute(params: RemoveCardParams): Promise<void> {
    try {
      const card = await this.repository.removeById(params.id);
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
