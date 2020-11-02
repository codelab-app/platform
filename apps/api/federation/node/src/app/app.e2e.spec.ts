import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { GraphqlConfigModule } from './graphql-config/graphql-config.module'
import { ConfigModule } from '@codelab/api/providers/config'
import { LoggerModule } from '@codelab/api/providers/logger'

class RequestBuilder {
  static async executeQuery(
    query: string,
    app: INestApplication,
    queryName = '',
    expected?: any,
  ) {
    return expected
      ? request(app.getHttpServer())
          .post('/graphql')
          .send({ query })
          .expect(200)
          .then((response: any) => {
            expect(response.body.data[queryName]).toStrictEqual(expected)
          })
      : request(app.getHttpServer())
          .post('/graphql')
          .send({ query })
          .expect(200)
  }
}

describe('AppModule', () => {
  let app: INestApplication
  let httpServer

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LoggerModule,
        ConfigModule.forRoot('.test.env'),
        GraphqlConfigModule,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    httpServer = app.getHttpServer()
    // Logger.log(httpServer, 'app.e2e.spec.ts')

    await app.init()
  })

  it('should create nodes', async () => {
    const mutation = (id: string, type: string): string => {
      return `
        mutation {
          CreateNode (id: ${id}, type: ${type}) {
              id,
              type
            } 
        }
        `
    }

    await RequestBuilder.executeQuery(
      mutation('1', 'REACT_DIV'),
      app,
      'CreateNode',
      { id: '1', type: 'REACT_DIV' },
    )
    await RequestBuilder.executeQuery(
      mutation('2', 'REACT_BUTTON'),
      app,
      'CreateNode',
      { id: '2', type: 'REACT_BUTTON' },
    )
    await RequestBuilder.executeQuery(
      mutation('3', 'REACT_HTML_A'),
      app,
      'CreateNode',
      { id: '3', type: 'REACT_HTML_A' },
    )
    await RequestBuilder.executeQuery(
      mutation('4', 'REACT_HTML_P'),
      app,
      'CreateNode',
      { id: '4', type: 'REACT_HTML_P' },
    )
  })

  it(`Get Nodes`, async () => {
    await RequestBuilder.executeQuery('{Node(id: 1) {id type }}', app, 'Node', [
      { id: '1', type: 'REACT_DIV' },
    ])
    await RequestBuilder.executeQuery('{Node(id: 2) {id type }}', app, 'Node', [
      { id: '2', type: 'REACT_BUTTON' },
    ])
    await RequestBuilder.executeQuery('{Node(id: 3) {id type }}', app, 'Node', [
      { id: '3', type: 'REACT_HTML_A' },
    ])
    await RequestBuilder.executeQuery('{Node(id: 4) {id type }}', app, 'Node', [
      { id: '4', type: 'REACT_HTML_P' },
    ])
  })

  afterAll(async () => {
    const query = `{
       clearGraph {
        result
      }
    }`
    // Clear whole graph

    // await RequestBuilder.executeQuery(query, app)
    await app.close()
  })
})
// Logger.log(process.cwd());
