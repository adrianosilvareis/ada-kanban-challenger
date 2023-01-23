import { faker } from '@faker-js/faker';

import { UnexpectedError } from '@/http-status/unexpected-error';
import { MakeLoginCommand } from '@/login/domain/use-cases/make-login-command';
import { UnauthorizedError } from '@/http-status/unauthorized-error';
import { NotFoundError } from '@/http-status/not-found-error';

import { GetAuthRepositoryStub } from '#/login/stubs/get-auth-repository-stub';
import { TokenServiceStub } from '#/login/stubs/token-service-stub';

describe('MakeLoginCommand', () => {
  it('should call "Success" on everything all right', async () => {
    // give
    const { sut, service, listeners } = makeSut();

    service.token = 'token';

    const params = { login: faker.name.firstName(), senha: faker.internet.password() };

    // when
    await sut.execute(params);

    // then
    expect(listeners.onSuccessSpy).toHaveBeenCalledWith('Bearer token');
  });

  it('should call "Error" on throw UnexpectedError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = { login: faker.name.firstName(), senha: faker.internet.password() };

    jest.spyOn(listeners, 'callbackRepository').mockImplementationOnce(() => {
      throw new UnexpectedError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onErrorSpy).toHaveBeenCalledWith('any_message');
  });

  it('should call "Unauthorized" on throw UnauthorizedError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = { login: faker.name.firstName(), senha: faker.internet.password() };

    jest.spyOn(listeners, 'callbackRepository').mockImplementationOnce(() => {
      throw new UnauthorizedError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onUnauthorizedSpy).toHaveBeenCalledWith('any_message');
  });

  it('should call "NotFound" on throw NotFoundError', async () => {
    // give
    const { sut, listeners } = makeSut();
    const params = { login: faker.name.firstName(), senha: faker.internet.password() };

    jest.spyOn(listeners, 'callbackRepository').mockImplementationOnce(() => {
      throw new NotFoundError('any_message');
    });

    // when
    await sut.execute(params);

    // then
    expect(listeners.onNotFoundSpy).toHaveBeenCalledWith('any_message');
  });
});

function makeSut() {
  const listeners = {
    onSuccessSpy: jest.fn(),
    onErrorSpy: jest.fn(),
    onNotFoundSpy: jest.fn(),
    onUnauthorizedSpy: jest.fn(),
    callbackRepository: jest.fn(),
    callbackService: jest.fn(),
  };

  const service = new TokenServiceStub();
  service.callback = listeners.callbackService;

  const repository = new GetAuthRepositoryStub();
  repository.callback = listeners.callbackRepository;
  const sut = new MakeLoginCommand(repository, service);

  sut.on('Success', listeners.onSuccessSpy);
  sut.on('NotFoundError', listeners.onNotFoundSpy);
  sut.on('UnauthorizedError', listeners.onUnauthorizedSpy);
  sut.on('InternalServerError', listeners.onErrorSpy);

  return {
    sut,
    service,
    repository,
    listeners,
  };
}
