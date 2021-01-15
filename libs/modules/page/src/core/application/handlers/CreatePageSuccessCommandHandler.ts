import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Page } from '../../domain/page'
import { CreatePageSuccessCommand } from '../commands/CreatePageSuccessCommand'

@CommandHandler(CreatePageSuccessCommand)
export class CreatePageSuccessCommandHandler
  implements ICommandHandler<CreatePageSuccessCommand> {
  public async execute(): Promise<Page> {
    return Promise.reject()
  }
}
