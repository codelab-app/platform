import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { EdgeModule } from '@codelab/modules/edge'
import { GraphModule } from '@codelab/modules/graph'
import { VertexModule } from '@codelab/modules/vertex'

describe.skip('DeleteVertexUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        TestInfrastructureModule,
        VertexModule,
        GraphModule,
        EdgeModule,
      ],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM graph')
  })

  afterEach(async () => {
    await connection.query('DELETE FROM vertex')
    await connection.query('DELETE FROM graph')
  })

  it('should delete existing vertex', async () => {
    const label = 'Graph 1'
    const createGraphMutation = `mutation {
			createGraph(graph: {label: "${label}"}) { id label }
		}`

    const createNewGraph = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createGraphMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createGraph.label).toEqual(label)
      })
    const newGraphId = createNewGraph.body.data.createGraph.id
    const createNewVertexMutation = `
			mutation {
				createVertex(vertex: {
				type: React_Fragment,  
				graph_id: "${newGraphId}" 
				props: { id: "123"}}) { id type props }
			}
		`
    const createNewVertex = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createNewVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createVertex.type).toEqual('React_Fragment')
        expect(res.body.data.createVertex.props).toEqual({ id: '123' })
      })
    const newVertexId = createNewVertex.body.data.createVertex.id
    const deleteVertexMutation = `
            mutation {
              deleteVertexById(vertex: {id: "${newVertexId}"}) { type }
            }
    `
    const deleteExistingVertex = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteVertexById.type).toEqual('React_Fragment')
      })
  })
  it('should return error when deleting non-existent vertex', async () => {
    const nonExistingVertexId = '72094318-408a-467d-8dd8-bd4b0ddb96cb'
    const deleteVertexMutation = `
            mutation {
              deleteVertexById(vertex: {id: "${nonExistingVertexId}"}) { type }
            }
    `
    const deleteNonExistingVertex = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: deleteVertexMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Vertex with id ${nonExistingVertexId} was not found`,
        )
      })
  })
})
