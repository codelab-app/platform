import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { GraphModule } from '../../../../framework/nestjs/GraphModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'

describe.skip('DeleteVertexUseCase', () => {
  let app: INestApplication

  let graphId = ''
  const graphLabel = 'Graph 1'

  beforeAll(async () => {
    app = await setupTestModule(app, GraphModule)
  })

  beforeEach(async () => {
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

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should delete node', async () => {
    const addChildVertexMutation = `
      mutation {
        addChildVertex(request:
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
        query: addChildVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildVertex.label).toEqual(graphLabel)
        expect(res.body.data.addChildVertex.vertices.length).toEqual(1)
        expect(res.body.data.addChildVertex.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildVertex.vertices[0].props).toMatchObject({
          id: 'root',
        })
      })
    const rootNodeId = addRootNode.body.data.addChildVertex.vertices[0].id
    const addChildVertexWithParentMutation = `
      mutation {
        addChildVertex(request:
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
    const addChildVertex: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: addChildVertexWithParentMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.addChildVertex.label).toEqual(graphLabel)
        expect(res.body.data.addChildVertex.vertices.length).toEqual(2)
        expect(res.body.data.addChildVertex.edges.length).toEqual(1)
        expect(res.body.data.addChildVertex.edges[0].source).toEqual(rootNodeId)
        expect(res.body.data.addChildVertex.edges[0].order).toEqual(0)
        expect(res.body.data.addChildVertex.edges[0].props).toMatchObject({
          id: 'a',
        })
        expect(res.body.data.addChildVertex.vertices[0].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildVertex.vertices[0].props).toMatchObject({
          id: 'root',
        })
        expect(res.body.data.addChildVertex.vertices[1].type).toEqual(
          'React_Text',
        )
        expect(res.body.data.addChildVertex.vertices[1].props).toMatchObject({
          id: 'a',
        })
      })
    const childNodeId = addChildVertex.body.data.addChildVertex.vertices[1].id
    const deleteVertexMutation = `
      mutation {
        deleteVertex(request: {vertexId: "${childNodeId}"}) {
          label
          vertices { id type props }
          edges { source target order props }
        }
      }
    `
    const deleteVertex = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteVertex.label).toEqual(graphLabel)
        expect(res.body.data.deleteVertex.edges.length).toEqual(0)
        expect(res.body.data.deleteVertex.vertices.length).toEqual(1)
      })
  })

  it('should return error for wrong vertex id', async () => {
    const wrongVertexId = '2fa9e75b-1f5d-4dd1-a58c-dbc09d822de9'
    const deleteVertexMutation = `
      mutation {
        deleteVertex(request: {vertexId: "${wrongVertexId}"}) {
          label
          vertices { id type props }
          edges { source target order props }
        }
      }
    `

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteVertexMutation,
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
