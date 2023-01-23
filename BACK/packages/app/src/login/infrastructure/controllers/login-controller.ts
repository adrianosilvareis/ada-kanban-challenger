import {
  JsonController, Res, Post, Body,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { LoginParams, MakeLoginCommand } from '@/login/domain/use-cases/make-login-command';

@injectable()
@JsonController()
export class LoginController {
  constructor(
    @inject(MakeLoginCommand) private readonly command: Commands<LoginParams>,
  ) {}

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

  private onNotFound(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.NOT_FOUND).json(props);
    };
  }

  private onUnauthorized(res: Response): (props: unknown) => void {
    return (props: unknown) => {
      res.status(StatusCodes.UNAUTHORIZED).json(props);
    };
  }

  @Post('/login')
  public async login(@Res() res: Response, @Body() body: LoginParams): Promise<Response> {
    this.command.on('InternalServerError', this.onError(res));
    this.command.on('Success', this.onSuccess(res));
    this.command.on('NotFoundError', this.onNotFound(res));
    this.command.on('UnauthorizedError', this.onUnauthorized(res));

    await this.command.execute(body);
    return res;
  }
}
