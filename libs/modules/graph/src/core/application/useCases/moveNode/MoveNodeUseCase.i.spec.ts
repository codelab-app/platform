import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

const addChildNodeToRootMutation = (
  graphId: string,
  rootNodeId: string,
  order: number,
  propsId: string,
): string => {
  return `
      mutation {
        addChildNode(request:
          {
            order: ${order},
            graphId: "${graphId}",
            parentVertexId: "${rootNodeId}",
            vertex:
            {
              type: React_Text,
              props: {
                id: "${propsId}"
              }
            }
          }) {
            label
            vertices { id type props }
            edges { id order source target props }
          }
      }
    `
}

const addChildNodeToRootRequest = async (
  app: INestApplication,
  query: string,
  graphLabel: string,
) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .send({
      query,
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.data.addChildNode.label).toEqual(graphLabel)
    })
}

describe.skip('MoveNodeUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, GraphModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')

    await app.close()
  })

  it('should move with same parent', async () => {
    const label = 'Graph 1'
    const createGraphMutation = `mutation {
			createGraph(graph: {label: "${label}"}) { id label }
		}`
    const createNewGraph: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createGraphMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createGraph.label).toEqual(label)
        expect(res.body.data.createGraph.id).toBeDefined()
      })
    const graphId = createNewGraph.body.data.createGraph.id
    const addRootNodeMutation = `
      mutation {
        addChildNode(request:
        {
          graphId: "${graphId}",
          vertex:
          {
            type: React_Fragment,
            props: {
              id: "root"
            }
          }
        }) {
          label
          vertices { id type props }
        }
      }
    `
    const addRootNode: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addRootNodeMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildNode.label).toEqual(label)
        expect(res.body.data.addChildNode.vertices.length).toEqual(1)
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Fragment',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
    const rootNodeId = addRootNode.body.data.addChildNode.vertices[0].id
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
      app,
      addChildNodeAMutation,
      label,
    )
    const addB = await addChildNodeToRootRequest(
      app,
      addChildNodeBMutation,
      label,
    )
    const addC = await addChildNodeToRootRequest(
      app,
      addChildNodeCMutation,
      label,
    )
    const addD = await addChildNodeToRootRequest(
      app,
      addChildNodeDMutation,
      label,
    )
    const addE: any = await addChildNodeToRootRequest(
      app,
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
      return v.props.id === 'a'
    })
    const vertexE = vertices.find((v: any) => {
      return v.props.id === 'e'
    })

    const moveVertexMutation = `
      mutation {
        moveNode(request: {
          graphId: "${graphId}",
          type: {
            source: "${vertexE.id}",
            target: "${vertexA.id}"
          }
        }) { id label edges { order source target props } }
      }
    `
    const moveNodeReq = await request(app.getHttpServer())
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
