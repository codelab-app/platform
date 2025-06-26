import type { GqlContext } from '@codelab/backend-abstract-types'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ModuleMetadata } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AppRepository } from '@codelab/backend-domain-app'
import { PropRepository } from '@codelab/backend-domain-prop'
import { UserRepository } from '@codelab/backend-domain-user'
import { CodelabLoggerModule } from '@codelab/backend-infra-adapter-logger'
import {
  DatabaseService,
  Neo4jModule,
} from '@codelab/backend-infra-adapter-neo4j-driver'
import { endpointConfig } from '@codelab/backend-infra-core'
import { startServer } from '@codelab/backend-test-utils'
import { ApolloDriver } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'
import {
  DataLoaderModule,
  DataLoaderService,
} from '@codelab/backend-infra-adapter-graphql'

import { SchemaService } from '../schema'
import { GraphQLSchemaModule } from '../schema/graphql-schema.module'

export const nestNeo4jGraphqlModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [
      GraphQLSchemaModule,
      DataLoaderModule,
      ConfigModule.forRoot({
        ignoreEnvVars: true,
        load: [endpointConfig],
      }),
    ],
    inject: [SchemaService, endpointConfig.KEY, DataLoaderService],
    useFactory: async (
      schemaService: SchemaService,
      endpoint: ConfigType<typeof endpointConfig>,
      dataLoaderService: DataLoaderService,
    ) => {
      return {
        context: (context: GqlContext) => {
          // Create new DataLoader instances for each request
          const loaders = dataLoaderService.getLoaders()
          
          return {
            ...context,
            jwt: {
              // Add roles that would satisfy your @authorization rules
              roles: ['Admin'],
            },
            loaders,
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
      DataLoaderModule,
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
