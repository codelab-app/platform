import {
  DatabaseService,
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  Neo4jModule,
  OgmModule,
  OgmService,
} from '@codelab/backend/infra/adapter/neo4j'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { ModuleMetadata } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import type { GqlContext } from '../middleware'

export const setupTestingContext = async (metadata: ModuleMetadata = {}) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      GraphQLModule.forRootAsync<ApolloDriverConfig>({
        driver: ApolloDriver,
        imports: [GraphQLSchemaModule],
        inject: [GRAPHQL_SCHEMA_PROVIDER],
        useFactory: async (graphqlSchema: GraphQLSchema) => {
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
            schema: graphqlSchema,
          }
        },
      }),
      Neo4jModule,
      OgmModule,
      ...(metadata.imports ?? []),
    ],
  })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile()

  const databaseService = module.get(DatabaseService)
  const ogmService = module.get(OgmService)
  const nestApp = module.createNestApplication()

  const beforeAll = async () => {
    await nestApp.init()
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
