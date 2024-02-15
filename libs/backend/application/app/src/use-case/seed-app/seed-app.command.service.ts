import { AppDomainService, AppRepository } from '@codelab/backend/domain/app'
import { AtomDomainService } from '@codelab/backend/domain/atom'
import { PageRepository } from '@codelab/backend/domain/page'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { UserRepository } from '@codelab/backend/domain/user'
import type {
  IAppDto,
  ICreatePageDto,
  IPageDto,
  IUserDto,
} from '@codelab/shared/abstract/core'
import { userDto } from '@codelab/shared/data/test'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

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
    private atomDomainService: AtomDomainService,
    private authDomainService: AuthDomainService,
  ) {}

  async execute(command: SeedAppCommand) {
    const owner = this.authDomainService.currentUser
    const { app } = command
    const appData = { ...app, owner }

    await this.appDomainService.createApp(appData)
  }
}
