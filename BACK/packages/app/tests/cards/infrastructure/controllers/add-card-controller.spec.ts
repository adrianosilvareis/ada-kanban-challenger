import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import StatusCodes from 'http-status-codes';
import { faker } from '@faker-js/faker';

import { LIST_NAME } from '@/cards/domain/entities/card';
import { AddCardController } from '@/cards/infrastructure/controllers/add-card-controller';
import { AddCardParams } from '@/cards/domain/use-cases/add-card-command';

import { CommandStub } from '#/cards/stubs/command-stub';

describe('AddCardController', () => {
  it('should be return 200 on success', async () => {
    // give
    const controller = new AddCardController(new CommandStub());
    const params = createAddCardParams();

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it('should be return a error on internal server error', async () => {
    // give
    const controller = new AddCardController(new CommandStub('InternalServerError'));
    const params = createAddCardParams();

    // // when
    const response = await controller.add(createResponse(), params) as MockResponse<Response>;

    // then
    expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

function createAddCardParams(): AddCardParams {
  return {
    titulo: faker.name.fullName(),
    conteudo: faker.name.fullName(),
    lista: LIST_NAME.TODO,
  };
}
