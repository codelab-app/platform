import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AppDITokens } from '../../../framework/AppDITokens'
import { AppRepositoryPort } from '../../adapters/AppRepositoryPort'
import { AddPageToAppCommand } from '../commands/AddPageToAppCommand'

@CommandHandler(AddPageToAppCommand)
export class AddPageToAppCommandHandler
  implements ICommandHandler<AddPageToAppCommand> {
  constructor(
    @Inject(AppDITokens.AppRepository)
    private readonly appRepository: AppRepositoryPort,
  ) {}

  public async execute({ app, page }: AddPageToAppCommand) {
    await this.appRepository.addPageToApp(app, page)
  }
}
