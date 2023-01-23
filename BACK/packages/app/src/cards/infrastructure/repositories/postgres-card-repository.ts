import { injectable } from 'inversify';
import { Uuid } from '@libs/uuid-lib/src/lib/uuid';
import { AdaCard } from '@prisma/client';

import { UpdateCardRepository } from '@/cards/domain/repositories/update-card-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddCardRepository } from '@/cards/domain/repositories/add-card-repository';
import { Card, LIST_NAME } from '@/cards/domain/entities/card';
import { ListCardsRepository } from '@/cards/domain/repositories/list-cards-repository';
import client from '@/config/database-client';
import { RemoveCardRepository } from '@/cards/domain/repositories/remove-card-repository';

@injectable()
export class PostgresCardRepositories implements
  ListCardsRepository,
  AddCardRepository,
  RemoveCardRepository,
  UpdateCardRepository {
  async update(params: Card): Promise<Card> {
    try {
      const card = await client.adaCard.update({
        where: {
          id: params.id,
        },
        data: params,
      });
      return this.parseToCard(card);
    } catch (error) {
      throw new NotFoundError('Record to update does not exist.');
    }
  }

  async removeById(id: string): Promise<Card> {
    try {
      const card = await client.adaCard.delete({
        where: {
          id,
        },
      });
      return this.parseToCard(card);
    } catch (error) {
      throw new NotFoundError('Record to delete does not exist.');
    }
  }

  async add(params: Omit<Card, 'id'>): Promise<Card> {
    const card = await client.adaCard.create({
      data: {
        id: Uuid.generate().toString(),
        titulo: params.titulo,
        conteudo: params.conteudo,
        lista: LIST_NAME.TODO,
      },
    });

    return this.parseToCard(card);
  }

  async list(): Promise<Card[]> {
    const list = await client.adaCard.findMany();

    return list.map(this.parseToCard);
  }

  private parseToCard(card: AdaCard): Card {
    return new Card(card.id, card.titulo, card.conteudo, LIST_NAME[card.lista]);
  }
}
