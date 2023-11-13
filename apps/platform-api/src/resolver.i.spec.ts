import {
  GRAPHQL_SCHEMA_PROVIDER,
  GraphQLSchemaModule,
  neo4jConfig,
} from '@codelab/backend/infra/adapter/neo4j'
import type { ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloDriver } from '@nestjs/apollo'
import type { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { Test, type TestingModule } from '@nestjs/testing'
import type { GraphQLFormattedError, GraphQLSchema } from 'graphql'
import request from 'supertest'
import { PlatformServerlessModule } from '@codelab/backend/infra/adapter/codelab'

describe('PageResolvers', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlatformServerlessModule],
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

  it('is true', () => {
    expect(true).toBeTruthy()
  })

  afterAll(async () => {
    await app.close()
  })
})
