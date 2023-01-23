import {
  JsonController, Res, Get, UseBefore,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { ListCardsCommand } from '@/cards/domain/use-cases/list-cards-command';
import { AuthenticationMiddleware } from '@/login/infrastructure/middlewares/authentication-middleware';

@injectable()
@JsonController()
@UseBefore(AuthenticationMiddleware)
export class ListCardsController {
  constructor(@inject(ListCardsCommand) private readonly command: Commands) {}

  private onSuccess(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.OK).json(props);
    };
  }

  private onError(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(props);
    };
  }

  @Get('/cards')
  public async list(@Res() res: Response): Promise<Response> {
    this.command.on('InternalServerError', this.onError(res));
    this.command.on('Success', this.onSuccess(res));

    await this.command.execute();
    return res;
  }
}
