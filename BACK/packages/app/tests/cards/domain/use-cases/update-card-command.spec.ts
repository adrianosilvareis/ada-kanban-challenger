import { NotFoundError } from '@/http-status/not-found-error';
import { UpdateCardCommand } from '@/cards/domain/use-cases/update-card-command';

import { CardBuilder } from '#/cards/builders/card-builder';
import { CardRepositoryStub } from '#/cards/stubs/card-repository-stub';

describe('UpdateCardCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, cardRepository, listeners } = makeSut();
    cardRepository.cards = new CardBuilder().buildMany(10);
    const params = cardRepository.cards[0];

    const cardUpdated = new CardBuilder().with('id', params.id).build();

    // when
    await sut.execute(cardUpdated);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith(cardUpdated);
  });

  it('should call "NotFoundError" on throw NotFoundError', async () => {
    // give
    const { sut, cardRepository, listeners } = makeSut();
    cardRepository.cards = new CardBuilder().buildMany(10);
    const params = new CardBuilder().build();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new NotFoundError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onNotFoundSpy).toHaveBeenCalledWith('Record to update does not exist.');
  });

  it('should call "InternalServerError" on throw UnexpectedError', async () => {
    // give
    const { sut, cardRepository, listeners } = makeSut();
    cardRepository.cards = new CardBuilder().buildMany(10);
    const params = cardRepository.cards[0];

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new Error('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalled();
  });
});

// eslint-disable-next-line no-empty-function
function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    onNotFoundSpy: jest.fn(),
    callback: jest.fn(),
  };

  const cardRepository = new CardRepositoryStub();
  cardRepository.callback = listeners.callback;
  const sut = new UpdateCardCommand(cardRepository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    cardRepository,
    listeners,
  };
}
