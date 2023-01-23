import { Card } from '@/cards/domain/entities/card';

export abstract class UpdateCardRepository {
  abstract update(Card: Card): Promise<Card>
}
