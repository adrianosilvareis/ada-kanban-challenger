import { Card } from '@/cards/domain/entities/card';

export abstract class AddCardRepository {
  abstract add(card: Omit<Card, 'id'>): Promise<Card>
}
