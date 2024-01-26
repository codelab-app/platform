import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLSchema } from 'graphql'
import { GraphQLSchemaModule } from '../../graphql-schema.module'
import { Neo4jModule, Neo4jService, OgmModule, OgmService } from '../../infra'
import { GRAPHQL_SCHEMA_PROVIDER } from '../../schema'

describe('ElementResolvers', () => {
  let app: INestApplication
  let neo4jService: Neo4jService
  let ogmService: OgmService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          imports: [GraphQLSchemaModule],
          inject: [GRAPHQL_SCHEMA_PROVIDER],
          useFactory: async (graphqlSchema: GraphQLSchema) => {
            return {
              schema: graphqlSchema,
            }
          },
        }),
        Neo4jModule,
        OgmModule,
      ],
    }).compile()

    neo4jService = module.get(Neo4jService)
    ogmService = module.get(OgmService)
    app = module.createNestApplication()

    await app.init()
  })

  beforeEach(async () => {
    await neo4jService.resetData()
  })

  it('should fetch all related types', () => {
    //
  })
})
