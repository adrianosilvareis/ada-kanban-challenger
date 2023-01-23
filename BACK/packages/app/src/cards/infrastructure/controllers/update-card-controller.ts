import {
  JsonController, Res, Body, Put, Param, UseBefore,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { UpdateCardCommand } from '@/cards/domain/use-cases/update-card-command';
import { Card } from '@/cards/domain/entities/card';
import { AuthenticationMiddleware } from '@/login/infrastructure/middlewares/authentication-middleware';

@injectable()
@JsonController()
@UseBefore(AuthenticationMiddleware)
export class UpdateCardController {
  constructor(
    @inject(UpdateCardCommand) private readonly updateCardCommand: Commands<Card>,
  ) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Put('/cards/:id')
  public async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() params: Card,
  ): Promise<Response> {
    this.updateCardCommand.on('InternalServerError', this.onError(res));
    this.updateCardCommand.on('NotFoundError', this.onNotFound(res));
    this.updateCardCommand.on('Success', this.onSuccess(res));

    params.id = id;

    await this.updateCardCommand.execute(params);
    return res;
  }
}
