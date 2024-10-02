/// <reference types="jest" />

import type { ModuleMetadata } from '@nestjs/common'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import {
  UserDomainModule,
  UserDomainService,
  UserRepository,
} from '@codelab/backend/domain/user'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  DatabaseService,
  Neo4jService,
  OgmModule,
} from '@codelab/backend/infra/adapter/neo4j'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { userDto } from '@codelab/shared/data/test'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

export const initUserContext = async (metadata: ModuleMetadata) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      RequestContextModule,
      UserDomainModule,
      ValidationModule,
      SharedDomainModule,
      CqrsModule,
      CodelabLoggerModule,
      OgmModule,
      ...(metadata.imports ?? []),
    ],
    providers: [UserRepository, ...(metadata.providers ?? [])],
  })
    .overrideProvider(AuthDomainService)
    .useValue({
      currentUser: userDto,
    })
    .compile()

  const nestApp = module.createNestApplication({
    logger: false,
  })

  const commandBus = module.get<CommandBus>(CommandBus)
  const userDomainService = module.get(UserDomainService)
  const requestContextMiddleware = module.get(RequestContextMiddleware)
  const neo4jService = module.get(Neo4jService)
  const authService = module.get(AuthDomainService)
  const databaseService = module.get(DatabaseService)
  const owner = userDto

  const beforeAll = async () => {
    /**
     * Need this for the CQRS handler to be loaded
     *
     * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
     */
    await nestApp.init()
    await databaseService.resetDatabase()

    await userDomainService.seedUser(owner)
  }

  const afterAll = async () => {
    await nestApp.close()
  }

  return {
    afterAll,
    authService,
    beforeAll,
    commandBus,
    module,
    neo4jService,
    nestApp,
    owner,
    requestContextMiddleware,
    userDomainService,
  }
}
