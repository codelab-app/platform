import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AppDITokens } from '../../../framework/AppDITokens'
import { AppRepositoryPort } from '../../adapters/AppRepositoryPort'
import { AssignPageToAppCommand } from '../commands/AssignPageToAppCommand'

@CommandHandler(AssignPageToAppCommand)
export class AssignPageToAppCommandHandler
  implements ICommandHandler<AssignPageToAppCommand> {
  constructor(
    @Inject(AppDITokens.AppRepository)
    private readonly appRepository: AppRepositoryPort,
  ) {}

  public async execute({ app, page }: AssignPageToAppCommand) {
    await this.appRepository.addPageToApp(app, page)
  }
}
