import { Commands } from '@libs/commands-lib';
import { inject, injectable } from 'inversify';

import { AddCardRepository } from '@/cards/domain/repositories/add-card-repository';
import { LIST_NAME } from '@/cards/domain/entities/card';

export interface AddCardParams {
  titulo: string
  conteudo: string
  lista: LIST_NAME
}

@injectable()
export class AddCardCommand extends Commands<AddCardParams> {
  public constructor(
    @inject(AddCardRepository) private readonly repository: AddCardRepository,
  ) {
    super();
  }

  async execute(params: AddCardParams): Promise<void> {
    try {
      const card = await this.repository.add(params);
      this.emit('Success', card);
    } catch (e: unknown) {
      const error: Error = e as Error;
      this.emit('InternalServerError', error.message);
    }
  }
}
