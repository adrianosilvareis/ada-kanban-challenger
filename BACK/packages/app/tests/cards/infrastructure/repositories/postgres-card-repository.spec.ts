import { NotFoundError } from '@/http-status/not-found-error';
import { PostgresCardRepositories } from '@/cards/infrastructure/repositories/postgres-card-repository';
import { LIST_NAME } from '@/cards/domain/entities/card';

import { prismaMock } from '#/config/client-database';
import { CardBuilder } from '#/cards/builders/card-builder';

describe('List', () => {
  test('should return card list', async () => {
    // give
    const cardList = new CardBuilder()
      .buildMany(10);

    // when
    prismaMock
      .adaCard
      .findMany
      .mockResolvedValueOnce(cardList);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.list()).resolves.toEqual(cardList);
  });
});

describe('Add', () => {
  test('should return new Card', async () => {
    // give
    const card = new CardBuilder().build();
    const params = {
      titulo: card.titulo,
      conteudo: card.conteudo,
      lista: LIST_NAME.TODO,
    };

    // when
    prismaMock
      .adaCard
      .create
      .mockResolvedValueOnce(card);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.add(params)).resolves.toEqual(card);
  });
});

describe('Remove', () => {
  test('should return remove card', async () => {
    // give
    const card = new CardBuilder().build();

    // when
    prismaMock
      .adaCard
      .delete
      .mockResolvedValueOnce(card);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.removeById(card.id)).resolves.toEqual(card);
  });

  test('should return throw NotFoundException when not card not exists', async () => {
    // give
    const card = new CardBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .adaCard
      .delete
      .mockRejectedValueOnce(error);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.removeById(card.id)).rejects.toThrowError(new NotFoundError('Record to delete does not exist.'));
  });
});

describe('Update', () => {
  test('should return updated card', async () => {
    // give
    const card = new CardBuilder().build();
    const newCard = new CardBuilder().with('id', card.id).build();

    // when
    prismaMock
      .adaCard
      .update
      .mockResolvedValueOnce(newCard);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.update(card)).resolves.toEqual(newCard);
  });

  test('should return throw NotFoundException when not card not exists', async () => {
    // give
    const card = new CardBuilder().build();
    const error = new Error('any_message');

    // when
    prismaMock
      .adaCard
      .update
      .mockRejectedValueOnce(error);

    const repository = new PostgresCardRepositories();

    // then
    await expect(repository.update(card)).rejects.toThrowError(new NotFoundError('Record to update does not exist.'));
  });
});
