import type { INestApplication, ModuleMetadata } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'

import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  HealthcheckController,
  SharedDomainModule,
} from '@codelab/backend/domain/shared/modules'
import {
  UserDomainModule,
  UserDomainService,
  UserRepository,
} from '@codelab/backend/domain/user'
import { GraphqlModule } from '@codelab/backend/infra/adapter/graphql'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import {
  ENDPOINT_CONFIG_KEY,
  endpointConfig,
} from '@codelab/backend/infra/core'
import {
  initUserServices,
  resetAndSeedDatabase,
  startServer,
} from '@codelab/backend/test/utils'
import {
  GraphQLSchemaModule,
  SchemaService,
} from '@codelab/backend-infra-adapter/neo4j-schema'
import { userDto } from '@codelab/shared/data/test'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

//
export const initUserContext = async (metadata?: ModuleMetadata) => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [HealthcheckController],
    imports: [
      UserDomainModule,
      SharedDomainModule,
      CqrsModule,
      CodelabLoggerModule,
      /**
       * This should be injected at point of use
       */
      // GraphqlModule,
      GraphqlModule.forRootAsync({
        imports: [GraphQLSchemaModule],
        inject: [SchemaService],
      }),
      ...(metadata?.imports ?? []),
    ],
    providers: [UserRepository, ...(metadata?.providers ?? [])],
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
  const requestContextMiddleware = module.get(RequestContextMiddleware)

  const { authService, owner, userDomainService } = await initUserServices(
    module,
  )

  const beforeAll = async () => {
    await startServer(nestApp)
    await resetAndSeedDatabase(module, userDomainService, owner)
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
    nestApp,
    owner,
    requestContextMiddleware,
    userDomainService,
  }
}
