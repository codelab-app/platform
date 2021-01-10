import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

const getUpdateNodeMutation = (graphId: string, vertexId: string): string => {
  return `
      mutation {
        updateNode(request: {
          graphId: "${graphId}",
          type: {
            id: "${vertexId}",
            type: React_Text,
            props: {
              id: "root123"
            }
          }
        }) { label vertices { id type props } }
      }
    `
}

describe.skip('UpdateNodeUseCase', () => {
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

  afterAll(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')

    await app.close()
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
      .expect((res) => {
        expect(res.body.data.createGraph.label).toEqual(graphLabel)
        expect(res.body.data.createGraph.id).toBeDefined()
      })

    graphId = createNewGraph.body.data.createGraph.id
  })

  it('should update vertex', async () => {
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
        expect(res.body.data.addChildNode.label).toEqual(graphLabel)
        expect(res.body.data.addChildNode.vertices.length).toEqual(1)
        expect(res.body.data.addChildNode.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildNode.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
    const vertexId = addChildNode.body.data.addChildNode.vertices[0].id
    const updateNodeMutation = getUpdateNodeMutation(graphId, vertexId)

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: updateNodeMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateNode.label).toEqual(graphLabel)
        expect(res.body.data.updateNode.vertices.length).toEqual(1)
        expect(res.body.data.updateNode.vertices[0].type).toEqual('React_Text')
        expect(res.body.data.updateNode.vertices[0].props).toMatchObject({
          id: 'root123',
        })
      })
  })

  it('should return error for wrong vertex id', async () => {
    const wrongVertexId = '2fa9e75b-1f5d-4dd1-a58c-dbc09d822de9'
    const updateNodeMutation = getUpdateNodeMutation(graphId, wrongVertexId)

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: updateNodeMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Vertex with id: ${wrongVertexId} was not found`,
        )
      })
  })
})
