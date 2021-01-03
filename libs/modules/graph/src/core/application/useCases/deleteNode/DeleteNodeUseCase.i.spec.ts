import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

describe.skip('DeleteNodeUseCase', () => {
  let app: INestApplication
  let connection: Connection

  let graphId = ''
  const graphLabel = 'Graph 1'

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

    const createGraphMutation = `mutation {
			createGraph(graph: {label: "${graphLabel}"}) { id label }
		}`
    const createNewGraph: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createGraphMutation,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.createGraph.label).toEqual(graphLabel)
        expect(res.body.data.createGraph.id).toBeDefined()
      })

    graphId = createNewGraph.body.data.createGraph.id
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  it('should delete node', async () => {
    const addChildNodeMutation = `
      mutation {
        addChildNode(request:
        {
          graphId: "${graphId}",
          vertex:
          {
            type: React_Text,
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
        query: addChildNodeMutation,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.addChildNode.label).toEqual(graphLabel)
        expect(res.body.data.addChildNode.vertices.length).toEqual(1)
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
    const rootNodeId = addRootNode.body.data.addChildNode.vertices[0].id
    const addChildNodeWithParentMutation = `
      mutation {
        addChildNode(request:
          {
            order: 0,
            graphId: "${graphId}",
            parentVertexId: "${rootNodeId}",
            vertex:
            {
              type: React_Text,
              props: {
                id: "a"
              }
            }
          }) {
            label
            vertices { id type props }
            edges { id order source target props }
          }
      }
    `
    const addChildNode: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addChildNodeWithParentMutation,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.addChildNode.label).toEqual(graphLabel)
        expect(res.body.data.addChildNode.vertices.length).toEqual(2)
        expect(res.body.data.addChildNode.edges.length).toEqual(1)
        expect(res.body.data.addChildNode.edges[0].source).toEqual(rootNodeId)
        expect(res.body.data.addChildNode.edges[0].order).toEqual(0)
        expect(res.body.data.addChildNode.edges[0].props).toMatchObject({
          id: 'a',
        })
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
        expect(res.body.data.addChildNode.vertices[1].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[1].props).toMatchObject({
          id: 'a',
        })
      })
    const childNodeId = addChildNode.body.data.addChildNode.vertices[1].id
    const deleteNodeMutation = `
      mutation {
        deleteNode(request: {vertexId: "${childNodeId}"}) {
          label
          vertices { id type props }
          edges { source target order props }
        }
      }
    `
    const deleteNode = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteNodeMutation,
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.deleteNode.label).toEqual(graphLabel)
        expect(res.body.data.deleteNode.edges.length).toEqual(0)
        expect(res.body.data.deleteNode.vertices.length).toEqual(1)
      })
  })

  it('should return error for wrong vertex id', async () => {
    const wrongVertexId = '2fa9e75b-1f5d-4dd1-a58c-dbc09d822de9'
    const deleteNodeMutation = `
      mutation {
        deleteNode(request: {vertexId: "${wrongVertexId}"}) {
          label
          vertices { id type props }
          edges { source target order props }
        }
      }
    `

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteNodeMutation,
      })
      .expect(200)
      .then((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Vertex with id: ${wrongVertexId} was not found`,
        )
      })
  })
})
