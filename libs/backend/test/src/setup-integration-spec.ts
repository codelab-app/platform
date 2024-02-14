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
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

export const initUserContext = async () => {
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
    providers: [UserRepository, AppRepository, PageRepository],
  }).compile()

  const nestApp = module.createNestApplication()
  const commandBus = module.get<CommandBus>(CommandBus)
  const userDomainService = module.get(UserDomainService)
  const requestContextMiddleware = module.get(RequestContextMiddleware)
  const neo4jService = module.get(Neo4jService)
  const appRepository = module.get(AppRepository)
  const authService = module.get(AuthDomainService)

  jest.spyOn(authService, 'currentUser', 'get').mockReturnValue(userDto)

  await nestApp.init()
  await neo4jService.resetData()

  return {
    module,
    appRepository,
    authService,
    commandBus,
    neo4jService,
    nestApp,
    userDomainService,
  }
}
