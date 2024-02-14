import {
  ReadAdminDataService,
  SharedApplicationModule,
} from '@codelab/backend/application/shared'
import { SeedUserCommand } from '@codelab/backend/application/user'
import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import {
  AuthDomainModule,
  AuthDomainService,
  mapAuth0IdTokenToUserDto,
} from '@codelab/backend/domain/shared/auth'
import {
  UserDomainModule,
  UserDomainService,
  UserRepository,
} from '@codelab/backend/domain/user'
import { Neo4jService, OgmModule } from '@codelab/backend/infra/adapter/neo4j'
import { OtelModule } from '@codelab/backend/infra/adapter/otel'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import type { IPageDto } from '@codelab/shared/abstract/core'
import { auth0IdToken, userDto } from '@codelab/shared/data/test'
import type { INestApplication } from '@nestjs/common'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'
import { v4 } from 'uuid'
import { SeedAppCommand, SeedAppHandler } from './seed-app.command.service'

const mockRequest = {
  user: auth0IdToken,
}

describe('SeedAppCommand', () => {
  const owner = userDto
  let commandBus: CommandBus
  let nestApp: INestApplication
  let userDomainService: UserDomainService
  let neo4jService: Neo4jService
  let requestContextMiddleware: RequestContextMiddleware
  let appRepository: AppRepository
  let authService: AuthDomainService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RequestContextModule,
        UserDomainModule,
        AuthDomainModule,
        AppDomainModule,
        OtelModule,
        ValidationModule,
        SharedApplicationModule,
        CqrsModule,
        OgmModule,
      ],
      providers: [
        SeedAppHandler,
        UserRepository,
        AppRepository,
        PageRepository,
      ],
    }).compile()

    nestApp = module.createNestApplication()
    commandBus = module.get<CommandBus>(CommandBus)
    userDomainService = module.get(UserDomainService)
    requestContextMiddleware = module.get(RequestContextMiddleware)
    neo4jService = module.get(Neo4jService)
    appRepository = module.get(AppRepository)
    authService = module.get(AuthDomainService)

    jest.spyOn(authService, 'currentUser', 'get').mockReturnValue(userDto)

    await nestApp.init()

    await neo4jService.resetData()
  })

  afterAll(async () => {
    await neo4jService.driver.close()
    await nestApp.close()
  })

  it('can seed an app with pages', async () => {
    await userDomainService.seedUser(owner)

    const page = {}

    const app = {
      id: v4(),
      name: 'Demo App',
      owner,
      // pages: [page],
    }

    const command = new SeedAppCommand(owner, app)

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
