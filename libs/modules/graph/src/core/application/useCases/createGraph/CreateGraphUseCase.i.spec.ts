import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { CreateGraphRequest } from './CreateGraphRequest'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

const createGraphMutation = ({ label }: CreateGraphRequest) => `
  mutation {
		createGraph(graph: {
      label: "${label}"
    }) {
      id
      label
    }
  }`

describe('CreateGraphUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, GraphModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  it('should create graph with a label', async () => {
    const label = 'Graph 1'

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createGraphMutation({ label }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createGraph.label).toEqual(label)
        expect(res.body.data.createGraph.id).toBeDefined()
      })
  })
})
