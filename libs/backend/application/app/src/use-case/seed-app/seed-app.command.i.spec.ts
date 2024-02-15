import {
  ReadAdminDataService,
  SharedApplicationModule,
} from '@codelab/backend/application/shared'
import { SeedUserCommand } from '@codelab/backend/application/user'
import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageDomainModule, PageRepository } from '@codelab/backend/domain/page'
import {
  AuthDomainModule,
  AuthDomainService,
  mapAuth0IdTokenToUserDto,
} from '@codelab/backend/domain/shared/auth'
import type { UserDomainService } from '@codelab/backend/domain/user'
import { UserDomainModule, UserRepository } from '@codelab/backend/domain/user'
import { Neo4jService, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { initUserContext } from '@codelab/backend/test'
import type { IPageDto, IUserDto } from '@codelab/shared/abstract/core'
import { auth0IdToken, userDto } from '@codelab/shared/data/test'
import type { INestApplication } from '@nestjs/common'
import type { CommandBus } from '@nestjs/cqrs'
import { CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { v4 } from 'uuid'
import { SeedAppCommand, SeedAppHandler } from './seed-app.command.service'

describe('SeedAppCommand', async () => {
  let owner: IUserDto
  let commandBus: CommandBus
  let userDomainService: UserDomainService
  let appRepository: AppRepository

  beforeAll(async () => {
    const context = await initUserContext({
      imports: [AppDomainModule, PageDomainModule],
      providers: [
        SeedAppHandler,
        UserRepository,
        AppRepository,
        PageRepository,
      ],
    })

    commandBus = context.commandBus
    appRepository = context.module.get(AppRepository)
    userDomainService = context.userDomainService
    owner = context.owner
  })

  it('can seed an app with pages', async () => {
    const page = {}

    const app = {
      id: v4(),
      name: 'Demo App',
      owner,
      // pages: [page],
    }

    const command = new SeedAppCommand(app, [])

    await commandBus.execute(command)

    const foundApp = await appRepository.findOne({ id: app.id })

    expect(foundApp).toEqual(
      expect.objectContaining({
        id: app.id,
        name: app.name,
      }),
    )
  })
})
