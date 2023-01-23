import { faker } from '@faker-js/faker';
import { Uuid } from '@libs/uuid-lib';

import { UnexpectedError } from '@/http-status/unexpected-error';
import { AddCardCommand, AddCardParams } from '@/cards/domain/use-cases/add-card-command';
import { LIST_NAME } from '@/cards/domain/entities/card';

import { CardRepositoryStub } from '#/cards/stubs/card-repository-stub';

describe('AddCardCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, cardRepository, listeners } = makeSut();
    const params = createAddCardParams();
    cardRepository.newId = Uuid.generate().toString();
    // when
    await sut.execute(params);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith({ ...params, id: cardRepository.newId });
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = createAddCardParams();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalledWith('any_message');
  });
});

function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    callback: jest.fn(),
  };

  const cardRepository = new CardRepositoryStub();
  cardRepository.callback = listeners.callback;
  const sut = new AddCardCommand(cardRepository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    cardRepository,
    listeners,
  };
}

function createAddCardParams(): AddCardParams {
  return {
    titulo: faker.name.fullName(),
    conteudo: faker.name.fullName(),
    lista: LIST_NAME.TODO,
  };
}
