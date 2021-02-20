import { INestApplication } from '@nestjs/common'
import { VertexType } from '@prisma/client'
import { print } from 'graphql'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  AddChildVertexGql,
  CreateAppGql,
  CreatePageGql,
  GetGraphGql,
  MoveVertexGql,
  RegisterUserGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { Edge, GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const addChildVertexToRootMutation = (
  graphId: string,
  rootNodeId: string,
  order: number,
  propsId: string,
) => {
  return {
    query: print(AddChildVertexGql),
    variables: {
      input: {
        order,
        parentVertexId: rootNodeId,
        vertex: {
          type: VertexType.React_Text,
          props: {
            id: propsId,
          },
        },
      },
    },
  }
}

const addChildVertexToRootRequest = async (
  app: INestApplication,
  query: any,
) => {
  return await request(app.getHttpServer())
    .send(query)
    .expect(200)
    .expect((res) => {
      expect(res.body.data.addChildVertex.type).toEqual(VertexType.React_Text)
    })
    .then((res) => res.body.data.addChildVertex)
}

describe('MoveVertexUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let app: App
  let page: any

  beforeAll(async () => {
    nestApp = await setupTestModule(
      nestApp,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )

    // Register user
    user = await request(nestApp.getHttpServer())
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

    // Create App
    const title = 'Test App'

    app = await request(nestApp.getHttpServer())
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

    // Create Page
    page = await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const pageRes = res.body.data.createPage

        expect(pageRes).toMatchObject({
          title: 'Page 1',
          graphs: [{ vertices: [{ type: VertexType.React_Page_Container }] }],
        })
      })
      .then((res) => res.body.data.createPage)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should move vertex', async () => {
    const graphId = page.graphs[0].id
    const rootNodeId = page.graphs[0].vertices[0].id
    const addChildVertexAMutation = addChildVertexToRootMutation(
      graphId,
      rootNodeId,
      0,
      'a',
    )
    const addChildVertexBMutation = addChildVertexToRootMutation(
      graphId,
      rootNodeId,
      1,
      'b',
    )
    const addChildVertexCMutation = addChildVertexToRootMutation(
      graphId,
      rootNodeId,
      2,
      'c',
    )

    const addA = await addChildVertexToRootRequest(
      nestApp,
      addChildVertexAMutation,
    )
    const addB = await addChildVertexToRootRequest(
      nestApp,
      addChildVertexBMutation,
    )
    const addC = await addChildVertexToRootRequest(
      nestApp,
      addChildVertexCMutation,
    )

    const verifyGraph = await request(nestApp.getHttpServer())
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

        const { edges } = res.body.data.getGraph
        const { vertices } = res.body.data.getGraph

        expect(graphRes).toMatchObject({
          vertices: [
            { id: rootNodeId },
            { id: addA.id },
            { id: addB.id },
            { id: addC.id },
          ],
          edges: [
            { source: rootNodeId, target: addA.id },
            { source: rootNodeId, target: addB.id },
            { source: rootNodeId, target: addC.id },
          ],
        })
      })

    await request(nestApp.getHttpServer())
      .send({
        query: print(MoveVertexGql),
        variables: {
          input: {
            currentVertexId: addC.id,
            parentVertexId: addA.id,
          },
        },
      })
      .expect(200)

    await request(nestApp.getHttpServer())
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
        const { edges } = res.body.data.getGraph
        // TODO: change this after we return edges by order
        const updatedEdge = edges.find((e: Edge) => {
          return e.source === addA.id && e.target === addC.id
        })

        expect(updatedEdge).toBeDefined()
      })
  })

  it('Should throw error if edges not found', async () => {
    await request(nestApp.getHttpServer())
      .send({
        query: print(MoveVertexGql),
        variables: {
          input: {
            currentVertexId: '',
            parentVertexId: '',
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual('Edge to update not found')
      })
  })
})
