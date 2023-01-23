import { ListCardsCommand } from '@/cards/domain/use-cases/list-cards-command';
import { UnexpectedError } from '@/http-status/unexpected-error';

import { CardRepositoryStub } from '#/cards/stubs/card-repository-stub';

describe('ListCardsCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, listeners } = makeSut();

    // when
    await sut.execute();

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalled();
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();

    jest.spyOn(listeners, 'callback').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute();

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalledWith('any_message');
  });
});

// eslint-disable-next-line no-empty-function
function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    callback: jest.fn(),
  };

  const cardRepository = new CardRepositoryStub();
  cardRepository.callback = listeners.callback;
  const sut = new ListCardsCommand(cardRepository);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    listeners,
  };
}
