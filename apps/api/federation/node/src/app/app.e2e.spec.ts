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

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LoggerModule,
        ConfigModule.forRoot('.test.env'),
        GraphqlConfigModule,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

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

  it('Link parents to children', async () => {
    const mutation = (fromId: string, toId: string) => {
      return `
        mutation {
          AddNodeChildren(from: {id: ${fromId}}, to: {id: ${toId}}) {
            from {
              id,
              type
            },
            to {
              id,
              type
            }
          }
        }
    `
    }

    await RequestBuilder.executeQuery(mutation('1', '2'), app)
    await RequestBuilder.executeQuery(mutation('1', '3'), app)
    await RequestBuilder.executeQuery(mutation('1', '4'), app)

    const query = `{
      Node(id: "1") {
        id,
        type,
        children {
          id, type 
        }
      }
    }`

    await RequestBuilder.executeQuery(query, app, 'Node', [
      {
        id: '1',
        type: 'REACT_DIV',
        children: [
          {
            id: '4',
            type: 'REACT_HTML_P',
          },
          {
            id: '3',
            type: 'REACT_HTML_A',
          },
          {
            id: '2',
            type: 'REACT_BUTTON',
          },
        ],
      },
    ])
  })

  it('Link children to parent', async () => {
    const mutation = (fromId: string, toId: string) => {
      return `
        mutation {
           AddNodeParent(from: {id: ${fromId}}, to: {id: ${toId}}) {
            from {
              id,
              type
            },
            to {
              id,
              type
            }
          }
        }
      `
    }

    await RequestBuilder.executeQuery(mutation('2', '1'), app)
    await RequestBuilder.executeQuery(mutation('3', '1'), app)
    await RequestBuilder.executeQuery(mutation('4', '1'), app)

    const query = (id: string) => {
      return `{
        Node(id: ${id}) {
          id,
          type,
          parent {
            id, type 
          }
        }
      }`
    }

    await RequestBuilder.executeQuery(query('4'), app, 'Node', [
      {
        id: '4',
        type: 'REACT_HTML_P',
        parent: {
          id: '1',
          type: 'REACT_DIV',
        },
      },
    ])
    await RequestBuilder.executeQuery(query('3'), app, 'Node', [
      {
        id: '3',
        type: 'REACT_HTML_A',
        parent: {
          id: '1',
          type: 'REACT_DIV',
        },
      },
    ])
    await RequestBuilder.executeQuery(query('2'), app, 'Node', [
      {
        id: '2',
        type: 'REACT_BUTTON',
        parent: {
          id: '1',
          type: 'REACT_DIV',
        },
      },
    ])
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

  it('Should Delete Node', async () => {
    const mutation = `
      mutation {
        DeleteNode(id: 3) {
          id, type
        }
      }
    `

    await RequestBuilder.executeQuery(mutation, app, 'DeleteNode', {
      id: '3',
      type: 'REACT_HTML_A',
    })
  })

  afterAll(async () => {
    const query = `{
       clearGraph {
        result
      }
    }`
    // Clear whole graph

    await RequestBuilder.executeQuery(query, app)
    await app.close()
  })
})
