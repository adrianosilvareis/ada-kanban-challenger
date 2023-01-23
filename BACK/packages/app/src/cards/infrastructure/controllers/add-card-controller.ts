import {
  JsonController, Res, Post, Body,
} from 'routing-controllers';
import { Response } from 'express';
import { inject, injectable } from 'inversify';
import { Commands } from '@libs/commands-lib';
import StatusCodes from 'http-status-codes';

import { AddCardCommand, AddCardParams } from '@/cards/domain/use-cases/add-card-command';

@injectable()
@JsonController()
export class AddCardController {
  constructor(
    @inject(AddCardCommand) private readonly command: Commands<AddCardParams>,
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

  @Post('/cards')
  public async add(@Res() res: Response, @Body() body: AddCardParams): Promise<Response> {
    this.command.on('InternalServerError', this.onError(res));
    this.command.on('Success', this.onSuccess(res));

    await this.command.execute(body);
    return res;
  }
}
