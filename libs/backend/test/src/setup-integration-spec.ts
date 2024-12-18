import { GraphqlModule } from '@codelab/backend/infra/adapter/graphql'
import { userDto } from '@codelab/shared/data/test'
/// <reference types="jest" />

import type { endpointConfig } from '@codelab/backend/infra/core'
import type { ModuleMetadata } from '@nestjs/common'
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
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import {
  DatabaseService,
  GraphQLSchemaModule,
  neo4jConfig,
  Neo4jService,
} from '@codelab/backend/infra/adapter/neo4j'
import {
  RequestContextMiddleware,
  RequestContextModule,
} from '@codelab/backend/infra/adapter/request-context'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { ENDPOINT_CONFIG_KEY } from '@codelab/backend/infra/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CommandBus, CqrsModule } from '@nestjs/cqrs'
import { Test, type TestingModule } from '@nestjs/testing'

export const initUserContext = async (metadata: ModuleMetadata) => {
  const module: TestingModule = await Test.createTestingModule({
    controllers: [HealthcheckController],
    imports: [
      RequestContextModule,
      UserDomainModule,
      ValidationModule,
      SharedDomainModule,
      CqrsModule,
      CodelabLoggerModule,
      GraphqlModule,
      // ConfigModule.forRoot({
      //   ignoreEnvVars: true,
      //   isGlobal: true,
      //   load: [neo4jConfig, endpointConfig],
      // }),
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
     * Add global prefix
     */
    const configService = nestApp.get(ConfigService)

    const config: ConfigType<typeof endpointConfig> =
      configService.getOrThrow(ENDPOINT_CONFIG_KEY)

    const baseApiPath = config.baseApiPath

    console.log('baseApiPath', baseApiPath)

    nestApp.setGlobalPrefix(baseApiPath)

    /**
     * Need this for the CQRS handler to be loaded
     *
     * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
     */
    await nestApp.init()

    /**
     * Need to start server
     */
    const port = config.apiPort

    console.log('port', port)

    await nestApp.listen(port)

    // Test if port is working by trying to connect
    try {
      const url = `http://127.0.0.1:${port}/api/v1/healthcheck`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Failed to connect to ${url}`)
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Could not connect to port ${port}: ${error.message}`)
    }

    /**
     * Database operations
     */
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
