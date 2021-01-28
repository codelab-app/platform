import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AddChildNodeGql,
  CreateAppGql,
  CreatePageGql,
  RegisterUserGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('AddChildNodeUseCase', () => {
  let app: INestApplication
  let user: User
  let page

  beforeAll(async () => {
    app = await setupTestModule(
      app,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )
    // Register user
    user = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should create 2 vertices and link them using edge', async () => {
    const title = 'Test App'
    const createApp: App = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
      .then((res) => res.body.data.createApp)
    const { id } = createApp

    page = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const pageRes = res.body.data.createPage

        expect(pageRes.title).toEqual('Page 1')
        expect(pageRes.graphs.length).toEqual(1)
        expect(pageRes.graphs[0].vertices.length).toEqual(1)
        expect(pageRes.graphs[0].vertices[0].type).toEqual(
          'React_Grid_Layout_Container',
        )
      })
      .then((res) => res.body.data.createPage)
    const graphId = page.graphs[0].id
    const parentVertexId = page.graphs[0].vertices[0].id

    const addChildNodeWithParent = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(AddChildNodeGql),
        variables: {
          input: {
            order: 0,
            graphId,
            parentVertexId,
            vertex: {
              type: 'React_Text',
              props: {
                id: 'a',
              },
            },
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const graph = res.body.data.addChildNode

        expect(graph.label).toEqual('Layout')
        expect(graph.vertices.length).toEqual(2)
        expect(graph.edges.length).toEqual(1)
        expect(graph.edges[0].source).toEqual(parentVertexId)
        expect(graph.edges[0].order).toEqual(0)
        expect(graph.vertices[0].type).toEqual('React_Grid_Layout_Container')
        expect(graph.vertices[1].type).toEqual('React_Text')
        expect(graph.vertices[1].props).toMatchObject({
          id: 'a',
        })
      })
  })
})
