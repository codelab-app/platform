import type { GqlContext } from '@codelab/backend/abstract/types'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ModuleMetadata } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import type { GraphQLSchema } from 'graphql'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AppRepository } from '@codelab/backend/domain/app'
import { ComponentDomainModule } from '@codelab/backend/domain/component'
import { ElementDomainModule } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { UserRepository } from '@codelab/backend/domain/user'
import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { ValidationModule } from '@codelab/backend/infra/adapter/typebox'
import { endpointConfig } from '@codelab/backend/infra/core'
import { startServer } from '@codelab/backend/test/utils'
import {
  DatabaseService,
  Neo4jModule,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ApolloDriver } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'

import { SchemaService } from '../schema'
import { GraphQLSchemaModule } from '../schema/graphql-schema.module'

export const nestNeo4jGraphqlModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [
      GraphQLSchemaModule,
      ConfigModule.forRoot({
        ignoreEnvVars: true,
        load: [endpointConfig],
      }),
    ],
    inject: [SchemaService, endpointConfig.KEY],
    useFactory: async (
      schemaService: SchemaService,
      endpoint: ConfigType<typeof endpointConfig>,
    ) => {
      return {
        context: (context: GqlContext) => {
          return {
            ...context,
            jwt: {
              // Add roles that would satisfy your @authorization rules
              roles: ['Admin'],
            },
          }
        },
        cors: true,
        introspection: true,
        path: `${endpoint.baseApiPath}/graphql`,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        schema: await schemaService.createSchema(),
      }
    },
  })

export const setupTestingContext = async (metadata: ModuleMetadata = {}) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      /**
       * Cannot import from infra due to circular dep
       */
      // GraphqlModule,
      nestNeo4jGraphqlModule,
      ConfigModule,
      CodelabLoggerModule,
      Neo4jModule,
      ValidationModule,
      ...(metadata.imports ?? []),
    ],
    providers: [
      AppRepository,
      UserRepository,
      PropRepository,
      ...(metadata.providers ?? []),
    ],
  })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile()

  const databaseService = module.get(DatabaseService)
  const nestApp = module.createNestApplication()

  const beforeAll = async () => {
    await startServer(nestApp)
    await databaseService.resetDatabase()
  }

  const afterAll = async () => {
    await nestApp.close()
  }

  return {
    afterAll,
    beforeAll,
    module,
    nestApp,
  }
}
