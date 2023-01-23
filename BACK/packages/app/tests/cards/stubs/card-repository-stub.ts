import { UpdateCardRepository } from '@/cards/domain/repositories/update-card-repository';
import { NotFoundError } from '@/http-status/not-found-error';
import { AddCardRepository } from '@/cards/domain/repositories/add-card-repository';
import { Card } from '@/cards/domain/entities/card';
import { ListCardsRepository } from '@/cards/domain/repositories/list-cards-repository';
import { AddCardParams } from '@/cards/domain/use-cases/add-card-command';
import { RemoveCardRepository } from '@/cards/domain/repositories/remove-card-repository';

export class CardRepositoryStub implements
ListCardsRepository,
AddCardRepository,
RemoveCardRepository,
UpdateCardRepository {
  public cards: Card[] = [];

  public newId: string = '';

  public callback!: () => void;

  async list(): Promise<Card[]> {
    this.callback();
    return this.cards;
  }

  async get(id: string): Promise<Card> {
    const card = this.cards.find((c) => c.id === id);

    if (!card) {
      throw new NotFoundError('Record not exist.');
    }

    this.callback();
    return card;
  }

  async add(params: AddCardParams): Promise<Card> {
    const card = new Card(this.newId, params.titulo, params.conteudo, params.lista);
    this.cards.push(card);

    this.callback();
    return card;
  }

  async removeById(id: string): Promise<Card> {
    const card = this.cards.find((c) => c.id === id);

    if (!card) {
      throw new NotFoundError('Record to delete does not exist.');
    }

    this.cards = this.cards.filter((c) => c.id !== id);

    this.callback();
    return card;
  }

  async update(params: Card): Promise<Card> {
    const card = this.cards.find((c) => c.id === params.id);

    if (!card) {
      throw new NotFoundError('Record to update does not exist.');
    }

    this.cards = this.cards.map((c) => (c.id !== params.id ? c : card));

    this.callback();
    return params;
  }
}
