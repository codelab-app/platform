import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { CreateGraphInput } from './CreateGraphInput'
import { TestInfrastructureModule } from '@codelab/backend'
import { GraphModule } from '@codelab/modules/graph'

const createGraphMutation = ({ label }: CreateGraphInput) => `
  mutation {
		createGraph(input: {
      label: "${label}"
    }) {
      id
      label
    }
  }`

describe.skip('CreateGraphUseCase', () => {
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
