import { AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import { UserRepository } from '@codelab/backend/domain/user'
import type { IAppDTO, IPageDTO, IUserDTO } from '@codelab/shared/abstract/core'
import { userDto } from '@codelab/shared/data/test'
import { Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

export class SeedAppCommand {
  constructor(
    public readonly owner: Pick<IUserDTO, 'id' | 'username'>,
    public readonly app: Pick<IAppDTO, 'id' | 'name' | 'pages'>,
  ) {}
}

@CommandHandler(SeedAppCommand)
export class SeedAppHandler implements ICommandHandler<SeedAppCommand> {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
  ) {}

  async execute(command: SeedAppCommand) {
    const { app, owner } = command
    const appData = { ...app, owner }

    await this.appRepository.add([appData])

    for (const page of app.pages ?? []) {
      await this.pageRepository.add([page])
    }
  }
}
