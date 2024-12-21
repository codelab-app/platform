import type { GqlContext } from '@codelab/backend/abstract/types'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import type { ModuleMetadata } from '@nestjs/common'
import type { GraphQLSchema } from 'graphql'

import {
  DatabaseService,
  Neo4jModule,
} from '@codelab/backend-infra-adapter/neo4j-driver'
import { ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Test, type TestingModule } from '@nestjs/testing'

import { SchemaService } from '../schema'
import { GraphQLSchemaModule } from '../schema/graphql-schema.module'

export const nestNeo4jGraphqlModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [GraphQLSchemaModule],
    inject: [SchemaService],
    useFactory: async (schemaService: SchemaService) => {
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
        schema: await schemaService.createSchema(),
      }
    },
  })

export const setupTestingContext = async (metadata: ModuleMetadata = {}) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [nestNeo4jGraphqlModule, Neo4jModule, ...(metadata.imports ?? [])],
  })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({ canActivate: () => true })
    .compile()

  const databaseService = module.get(DatabaseService)
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
