import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { Uuid } from '@libs/uuid-lib';

import { RemoveCardController } from '@/cards/infrastructure/controllers/remove-card-controller';

import { CommandStub } from '#/cards/stubs/command-stub';

describe('RemoveCardController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new RemoveCardController(new CommandStub());
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new RemoveCardController(new CommandStub('InternalServerError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new RemoveCardController(new CommandStub('NotFoundError'));
    const params = { id: Uuid.generate().toString() };

    // // when
    const response = await controller.remove(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
