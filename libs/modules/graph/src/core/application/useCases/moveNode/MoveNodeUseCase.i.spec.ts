import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { CreateAppGql } from '../../../../../../app/src/core/application/useCases/createApp/CreateApp.generated'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { AddChildNodeGql } from '../addChildNode/AddChildNode.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { CreatePageGql } from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const addChildNodeToRootMutation = (
  graphId: string,
  rootNodeId: string,
  order: number,
  propsId: string,
) => {
  return {
    query: print(AddChildNodeGql),
    variables: {
      input: {
        order,
        graphId,
        parentVertexId: rootNodeId,
        vertex: {
          type: 'React_Text',
          props: {
            id: propsId,
          },
        },
      },
    },
  }
}

const addChildNodeToRootRequest = async (
  app: INestApplication,
  query: any,
  graphLabel: string,
) => {
  return await request(app.getHttpServer())
    .post('/graphql')
    .send(query)
    .expect(200)
    .expect((res) => {
      expect(res.body.data.addChildNode.label).toEqual(graphLabel)
    })
}

describe.skip('MoveNodeUseCase', () => {
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

    // Create App
    const title = 'Test App'

    app = await request(nestApp.getHttpServer())
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
    // Create Page
    page = await request(nestApp.getHttpServer())
      .post('/graphql')
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

        expect(pageRes.title).toEqual('Page 1')
        expect(pageRes.graphs.length).toEqual(1)
        expect(pageRes.graphs[0].vertices.length).toEqual(1)
        expect(pageRes.graphs[0].vertices[0].type).toEqual(
          'React_Grid_Layout_Container',
        )
      })
      .then((res) => res.body.data.createPage)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should move with same parent', async () => {
    const label = 'Layout'
    const graphId = page.graphs[0].id
    const rootNodeId = page.graphs[0].vertices[0].id
    const addChildNodeAMutation = addChildNodeToRootMutation(
      graphId,
      rootNodeId,
      0,
      'a',
    )
    const addChildNodeBMutation = addChildNodeToRootMutation(
      graphId,
      rootNodeId,
      1,
      'b',
    )
    const addChildNodeCMutation = addChildNodeToRootMutation(
      graphId,
      rootNodeId,
      2,
      'c',
    )
    const addChildNodeDMutation = addChildNodeToRootMutation(
      graphId,
      rootNodeId,
      3,
      'd',
    )
    const addChildNodeEMutation = addChildNodeToRootMutation(
      graphId,
      rootNodeId,
      4,
      'e',
    )

    const addA = await addChildNodeToRootRequest(
      nestApp,
      addChildNodeAMutation,
      label,
    )
    const addB = await addChildNodeToRootRequest(
      nestApp,
      addChildNodeBMutation,
      label,
    )
    const addC = await addChildNodeToRootRequest(
      nestApp,
      addChildNodeCMutation,
      label,
    )
    const addD = await addChildNodeToRootRequest(
      nestApp,
      addChildNodeDMutation,
      label,
    )
    const addE: any = await addChildNodeToRootRequest(
      nestApp,
      addChildNodeEMutation,
      label,
    )

    const { edges } = addE.body.data.addChildNode

    expect(edges[0].order).toEqual(0)
    expect(edges[0].props).toMatchObject({ id: 'a' })
    expect(edges[1].order).toEqual(1)
    expect(edges[1].props).toMatchObject({ id: 'b' })
    expect(edges[2].order).toEqual(2)
    expect(edges[2].props).toMatchObject({ id: 'c' })
    expect(edges[3].order).toEqual(3)
    expect(edges[3].props).toMatchObject({ id: 'd' })
    expect(edges[4].order).toEqual(4)
    expect(edges[4].props).toMatchObject({ id: 'e' })

    const { vertices } = addE.body.data.addChildNode
    const vertexA = vertices.find((v: any) => {
      return v.props?.id === 'a'
    })
    const vertexE = vertices.find((v: any) => {
      return v.props?.id === 'e'
    })

    const moveVertexMutation = `
      mutation {
        moveNode(input: {
          graphId: "${graphId}",
          type: {
            source: "${vertexE.id}",
            target: "${vertexA.id}"
          }
        }) { id label edges { order source target props } }
      }
    `
    const moveNodeReq = await request(nestApp.getHttpServer())
      .post('/graphql')
      .send({
        query: moveVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.moveNode.label).toEqual(label)
        expect(res.body.data.moveNode.edges[0].order).toEqual(0)
        expect(res.body.data.moveNode.edges[0].props).toMatchObject({
          id: 'a',
        })
        expect(res.body.data.moveNode.edges[1].order).toEqual(1)
        expect(res.body.data.moveNode.edges[1].props).toMatchObject({
          id: 'e',
        })
        expect(res.body.data.moveNode.edges[2].order).toEqual(2)
        expect(res.body.data.moveNode.edges[2].props).toMatchObject({
          id: 'b',
        })
        expect(res.body.data.moveNode.edges[3].order).toEqual(3)
        expect(res.body.data.moveNode.edges[3].props).toMatchObject({
          id: 'c',
        })
        expect(res.body.data.moveNode.edges[4].order).toEqual(4)
        expect(res.body.data.moveNode.edges[4].props).toMatchObject({
          id: 'd',
        })
      })
  })
})
