import { Builder } from '@libs/entity-builder';
import { faker } from '@faker-js/faker';

import { Card, LIST_NAME } from '@/cards/domain/entities/card';

export class CardBuilder extends Builder<Card, CardBuilder> {
  public constructor() {
    super(CardBuilder);
  }

  protected buildDefault(): Card {
    return new Card(
      faker.datatype.uuid(),
      faker.name.fullName(),
      faker.lorem.lines(3),
      LIST_NAME.TODO,
    );
  }
}
