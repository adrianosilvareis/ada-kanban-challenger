import {
  JsonController, Res, Delete, Params, UseBefore,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { RemoveCardCommand, RemoveCardParams } from '@/cards/domain/use-cases/remove-card-command';
import { AuthenticationMiddleware } from '@/login/infrastructure/middlewares/authentication-middleware';

@injectable()
@JsonController()
@UseBefore(AuthenticationMiddleware)
export class RemoveCardController {
  constructor(
    @inject(RemoveCardCommand) private readonly removeCardCommand: Commands<RemoveCardParams>,
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

  @Delete('/cards/:id')
  public async remove(
    @Res() res: Response,
    @Params() params: RemoveCardParams,
  ): Promise<Response> {
    this.removeCardCommand.on('InternalServerError', this.onError(res));
    this.removeCardCommand.on('NotFoundError', this.onNotFound(res));
    this.removeCardCommand.on('Success', this.onSuccess(res));

    await this.removeCardCommand.execute(params);
    return res;
  }
}
