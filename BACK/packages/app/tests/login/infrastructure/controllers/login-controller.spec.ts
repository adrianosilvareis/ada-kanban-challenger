import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { faker } from '@faker-js/faker';

import { LoginController } from '@/login/infrastructure/controllers/login-controller';

import { CommandStub } from '#/login/stubs/command-stub';

describe('LoginController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new LoginController(new CommandStub());
    const params = { login: faker.internet.userName(), senha: faker.internet.password() };

    // // when
    const response = await controller.login(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new LoginController(new CommandStub('InternalServerError'));
    const params = { login: faker.internet.userName(), senha: faker.internet.password() };

    // // when
    const response = await controller.login(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a NotFoundError on login not found', async () => {
    // give
    const controller = new LoginController(new CommandStub('NotFoundError'));
    const params = { login: faker.internet.userName(), senha: faker.internet.password() };

    // // when
    const response = await controller.login(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  it("should be return a Unauthorized on password don't match", async () => {
    // give
    const controller = new LoginController(new CommandStub('UnauthorizedError'));
    const params = { login: faker.internet.userName(), senha: faker.internet.password() };

    // // when
    const response = await controller.login(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.UNAUTHORIZED);
  });
});
