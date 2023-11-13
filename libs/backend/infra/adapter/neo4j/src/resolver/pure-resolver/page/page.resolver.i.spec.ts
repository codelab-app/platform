import { providerPageData } from '@codelab/shared/data/test'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'
import request from 'supertest'
import { v4 } from 'uuid'
import { GraphQLSchemaModule } from '../../../graphql-schema.module'
import { GRAPHQL_SCHEMA_PROVIDER } from '../../../schema'

describe('PageResolvers', () => {
  let app: INestApplication

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
      ],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    // Need to seed data, but can't import PageRepository due to circular dep
    // Likely just seed by calling the GraphQL endpoints
    // const pageRepository = module.get(PageRepository)
    // await pageRepository.add([providerPageData(v4())])
  })

  it('should fetch a page', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ pages { id } }' })
      .expect(200)
      .expect((res) => {
        console.log(res.body)

        expect(res.body.data).toEqual({ pages: [] })
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
