import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

describe.skip('AddChildNodeUseCase', () => {
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

  afterAll(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')

    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')
  })

  it('should create vertex under graph', async () => {
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
    const addChildNode = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addChildNodeMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildNode.label).toEqual(label)
        expect(res.body.data.addChildNode.vertices.length).toEqual(1)
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
  })

  it('should create 2 vertices and link them using edge', async () => {
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
    const addChildNode: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addChildNodeMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildNode.label).toEqual(label)
        expect(res.body.data.addChildNode.vertices.length).toEqual(1)
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
    const childNodeId = addChildNode.body.data.addChildNode.vertices[0].id
    const addChildNodeWithParentMutation = `
      mutation {
        addChildNode(request:
          {
            order: 0,
            graphId: "${graphId}",
            parentVertexId: "${childNodeId}",
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
    const addChildNodeWithParent = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addChildNodeWithParentMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildNode.label).toEqual(label)
        expect(res.body.data.addChildNode.vertices.length).toEqual(2)
        expect(res.body.data.addChildNode.edges.length).toEqual(1)
        expect(res.body.data.addChildNode.edges[0].source).toEqual(childNodeId)
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
  })
})
