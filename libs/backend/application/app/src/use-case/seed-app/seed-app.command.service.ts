import { AppDomainService } from '@codelab/backend/domain/app'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import type { IAppDto, ICreatePageDto } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class SeedAppCommand {
  constructor(
    public readonly app: Pick<IAppDto, 'id' | 'name'>,
    public readonly pages: Array<ICreatePageDto>,
  ) {}
}

/**
 * This application layer seeder takes care of creating default atoms that is required for the app to work, something that is not validated in the domain layer.
 */
@CommandHandler(SeedAppCommand)
export class SeedAppHandler implements ICommandHandler<SeedAppCommand> {
  constructor(
    private appDomainService: AppDomainService,
    private authDomainService: AuthDomainService,
  ) {}

  async execute(command: SeedAppCommand) {
    const owner = this.authDomainService.currentUser
    const { app } = command
    const appData = { ...app, owner }

    await this.appDomainService.createApp(appData)
  }
}
