/// <reference types="jest" />

import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import {
  AuthDomainModule,
  AuthDomainService,
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
import { userDto } from '@codelab/shared/data/test'
import type { ModuleMetadata } from '@nestjs/common'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

export const initUserContext = async (metadata: ModuleMetadata) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      RequestContextModule,
      UserDomainModule,
      AuthDomainModule,
      OtelModule,
      ValidationModule,
      SharedApplicationModule,
      CqrsModule,
      OgmModule,
      ...(metadata.imports ?? []),
    ],
    providers: [
      UserRepository,
      AppRepository,
      PageRepository,
      ...(metadata.providers ?? []),
    ],
  }).compile()

  const nestApp = module.createNestApplication()
  const commandBus = module.get<CommandBus>(CommandBus)
  const userDomainService = module.get(UserDomainService)
  const requestContextMiddleware = module.get(RequestContextMiddleware)
  const neo4jService = module.get(Neo4jService)
  const authService = module.get(AuthDomainService)
  const owner = userDto

  const afterAll = async () => {
    await neo4jService.driver.close()
    await nestApp.close()
  }

  const beforeAll = async () => {
    await nestApp.init()
    await neo4jService.resetData()

    jest.spyOn(authService, 'currentUser', 'get').mockReturnValue(userDto)
    await userDomainService.seedUser(owner)
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
