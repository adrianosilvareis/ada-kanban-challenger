import { Card } from '@/cards/domain/entities/card';

export abstract class RemoveCardRepository {
  abstract removeById(id: string): Promise<Card>
}
