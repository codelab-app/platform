import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'
import request from 'supertest'
import { GraphQLSchemaModule } from '../../../graphql-schema.module'
import { neo4jConfig } from '../../../neo4j.config'
import { GRAPHQL_SCHEMA_PROVIDER } from '../../../schema'

describe('PageResolvers', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // ConfigModule.forRoot({
        //   ignoreEnvVars: true,
        //   isGlobal: true,
        //   load: [neo4jConfig],
        // }),
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          imports: [GraphQLSchemaModule],
          inject: [GRAPHQL_SCHEMA_PROVIDER],
          useFactory: async (graphqlSchema: GraphQLSchema) => {
            console.log(graphqlSchema)

            return {
              cors: false,
              debug: true,
              introspection: true,
              path: 'api/graphql',
              playground: false,
              schema: graphqlSchema,
            }
          },
        }),
      ],
    }).compile()

    // Log the neo4jConfig values
    console.log('neo4jConfig:', neo4jConfig())

    app = module.createNestApplication()
    await app.init()
  })

  // it('should fetch a page', async () => {
  //   request(app.getHttpServer())
  //     .post('api/graphql')
  //     .send({ query: '{ pages { id } }' })
  //     .expect(200)
  //     .expect((res) => {
  //       console.log(res.body)

  //       expect(res.body.data).toEqual([])
  //     })
  // })

  // afterAll(async () => {
  //   await app.close()
  // })

  it('is true', () => {
    expect(true).toBeTruthy()
  })
})
