import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createRequest, createResponse } from 'node-mocks-http';

import { TokenService } from '@/login/domain/services/token-services';
import { AuthenticationMiddleware } from '@/login/infrastructure/middlewares/authentication-middleware';

import { TokenServiceStub } from '#/login/stubs/token-service-stub';

const createRequestObjectWithValidJwt = (): Request => createRequest({
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoidGVzdCJ9.iL8TXgK9mmlflvOH7_RVYAcswtSiCDf4xvxICi5SAZc',
  },
});

const createRequestObjectWithInvalidJwt = (): Request => createRequest({
  headers: {
    authorization: 'eyJhbGciOiJIUzI1NiJ9.test.eyJkYXRhIjoidGVzdCJ9.iL8TXgK9mmlflvOH7_RVYAcswtSiCDf4xvxICi5SAZc',
  },
});

const createSubject = (tokenServices?: TokenService) => {
  const service = new TokenServiceStub();
  service.callback = () => null;

  const middleware = new AuthenticationMiddleware(
    tokenServices ?? service,
  );
  const response = createResponse();
  const next = jest.fn();
  return {
    middleware, response, service, next,
  };
};

describe('AuthenticationMiddleware', () => {
  it('should call next callback when authentication is valid', async () => {
    // given
    const request = createRequestObjectWithValidJwt();
    const { middleware, response, next } = createSubject();

    // when
    await middleware.use(request, response, next);

    // then
    expect(next).toBeCalledTimes(1);
  });

  it('should not end response when authentication is valid', async () => {
    // given
    const request = createRequestObjectWithValidJwt();
    const { middleware, response, next } = createSubject();

    // when
    await middleware.use(request, response, next);

    // then
    expect(response.headersSent).toBe(false);
  });

  it('should send response with unauthorized status code when invalid service response', async () => {
    // given
    const service = new TokenServiceStub();
    service.callback = () => null;
    service.isValid = false;
    const { middleware, response, next } = createSubject(service);
    const request = createRequestObjectWithValidJwt();

    // when
    await middleware.use(request, response, next);

    // then
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('should send response with unauthorized status code when token is invalid', async () => {
    // given
    const service = new TokenServiceStub();
    service.callback = () => null;
    service.isValid = false;
    const request = createRequestObjectWithInvalidJwt();
    const { middleware, response, next } = createSubject(service);

    // when
    await middleware.use(request, response, next);

    // then
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});
