import { Card } from '@/cards/domain/entities/card';

export abstract class ListCardsRepository {
  abstract list(): Promise<Card[]>
}
