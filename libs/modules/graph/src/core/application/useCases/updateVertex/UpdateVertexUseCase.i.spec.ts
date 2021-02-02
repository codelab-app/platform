import { INestApplication } from '@nestjs/common'
import { VertexType } from '@prisma/client'
import { print } from 'graphql'
import request from 'supertest'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AddChildVertexGql,
  CreateAppGql,
  CreatePageGql,
  RegisterUserGql,
  UpdateVertexGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const getUpdateVertexMutation = (graphId: string, vertexId: string) => {
  return {
    query: print(UpdateVertexGql),
    variables: {
      input: {
        graphId,
        vertexId,
        type: 'React_Icon',
      },
    },
  }
}

describe.skip('UpdateVertexUseCase', () => {
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

        expect(pageRes.title).toEqual('Page 1')
        expect(pageRes.graphs.length).toEqual(1)
        expect(pageRes.graphs[0].vertices.length).toEqual(1)
        expect(pageRes.graphs[0].vertices[0].type).toEqual(
          VertexType.React_RGL_ResponsiveContainer,
        )
      })
      .then((res) => res.body.data.createPage)
    const graphId = page.graphs[0].id
    const parentVertexId = page.graphs[0].vertices[0].id

    const addChildVertex: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(AddChildVertexGql),
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
        expect(res.body.data.addChildVertex.label).toEqual('Layout')
        expect(res.body.data.addChildVertex.vertices.length).toEqual(2)
        // expect(res.body.data.addChildVertex.vertices[0].type).toEqual(
        //   'React_Text',
        // )
        // expect(res.body.data.addChildVertex.vertices[0].props).toMatchObject({
        //   id: 'a',
        // })
      })
    const vertexId = addChildVertex.body.data.addChildVertex.vertices[1].id
    const updateVertexMutation = getUpdateVertexMutation(graphId, vertexId)

    await request(app.getHttpServer())
      .post('/graphql')
      .send(updateVertexMutation)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateVertex.label).toEqual(graphLabel)
        expect(res.body.data.updateVertex.vertices.length).toEqual(1)
        expect(res.body.data.updateVertex.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.updateVertex.vertices[0].props).toMatchObject({
          id: 'root123',
        })
      })
  })

  // it('should return error for wrong vertex id', async () => {
  //   const wrongVertexId = '2fa9e75b-1f5d-4dd1-a58c-dbc09d822de9'
  //   const updateVertexMutation = getUpdateVertexMutation(graphId, wrongVertexId)
  //
  //   await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send(updateVertexMutation,)
  //     .expect(200)
  //     .expect((res) => {
  //       const errorMsg = res.body?.errors[0].message
  //
  //       expect(errorMsg).toEqual(
  //         `Vertex with id: ${wrongVertexId} was not found`,
  //       )
  //     })
  // })
})
