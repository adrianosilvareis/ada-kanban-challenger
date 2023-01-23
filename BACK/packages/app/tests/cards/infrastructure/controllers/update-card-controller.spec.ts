import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';

import { UpdateCardController } from '@/cards/infrastructure/controllers/update-card-controller';

import { CardBuilder } from '#/cards/builders/card-builder';
import { CommandStub } from '#/cards/stubs/command-stub';

describe('UpdateCardController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new UpdateCardController(new CommandStub());
    const params = new CardBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new UpdateCardController(new CommandStub('InternalServerError'));
    const params = new CardBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it('should be return a notFound on not found error', async () => {
    // give
    const controller = new UpdateCardController(new CommandStub('NotFoundError'));
    const params = new CardBuilder().build();

    // // when
    const response = await controller
      .update(createResponse(), params.id, params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });
});
