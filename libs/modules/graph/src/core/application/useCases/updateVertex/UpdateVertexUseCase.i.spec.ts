import { INestApplication } from '@nestjs/common'
import { VertexType } from '@prisma/client'
import { print } from 'graphql'
import request from 'supertest'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AddChildVertexGql,
  CreateAppGql,
  CreatePageGql,
  GetGraphGql,
  RegisterUserGql,
  UpdateVertexGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { Graph, GraphModule, Vertex } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const getUpdateVertexMutation = (vertexId: string) => {
  return {
    query: print(UpdateVertexGql),
    variables: {
      input: {
        vertexId,
        type: VertexType.React_Icon,
        props: {
          id: 'b',
        },
      },
    },
  }
}

describe('UpdateVertexUseCase', () => {
  let app: INestApplication
  let user: User
  let page

  const graphLabel = 'Graph 1'

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

  it('should update vertex', async () => {
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

        expect(pageRes).toMatchObject({
          title: 'Page 1',
          graphs: [
            { vertices: [{ type: VertexType.React_RGL_ResponsiveContainer }] },
          ],
        })
      })
      .then((res) => res.body.data.createPage)
    const graphId = page.graphs[0].id
    const parentVertexId = page.graphs[0].vertices[0].id

    const addChildVertex: Vertex = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(AddChildVertexGql),
        variables: {
          input: {
            order: 0,
            parentVertexId,
            vertex: {
              type: VertexType.React_Text,
              props: {
                id: 'a',
              },
            },
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const vertexRes = res.body.data.addChildVertex

        expect(vertexRes).toMatchObject({
          type: VertexType.React_Text,
          props: { id: 'a' },
        })

        expect(vertexRes.id).toBeDefined()
      })
      .then((res) => res.body.data.addChildVertex)

    const verifyGraph: Graph = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(GetGraphGql),
        variables: {
          input: {
            id: graphId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const graphRes = res.body.data.getGraph

        expect(graphRes).toMatchObject({
          vertices: [
            {
              id: parentVertexId,
              type: VertexType.React_RGL_ResponsiveContainer,
            },
            {
              type: VertexType.React_Text,
            },
          ],
          edges: [
            {
              source: parentVertexId,
              target: addChildVertex.id,
            },
          ],
        })
      })
      .then((res) => res.body.data.getGraph)

    const updateVertexMutation = getUpdateVertexMutation(addChildVertex.id)

    await request(app.getHttpServer())
      .post('/graphql')
      .send(updateVertexMutation)
      .expect(200)
      .expect((res) => {
        const vertexRes = res.body.data.updateVertex

        expect(vertexRes).toMatchObject({
          type: VertexType.React_Icon,
          props: { id: 'b' },
        })
      })
  })

  it('should return error for wrong vertex id', async () => {
    const wrongVertexId = '2fa9e75b-1f5d-4dd1-a58c-dbc09d822de9'
    const updateVertexMutation = getUpdateVertexMutation(wrongVertexId)

    await request(app.getHttpServer())
      .post('/graphql')
      .send(updateVertexMutation)
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Could not update vertex with id: ${wrongVertexId}`,
        )
      })
  })
})
