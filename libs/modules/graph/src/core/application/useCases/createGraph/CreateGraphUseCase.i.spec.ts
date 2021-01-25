import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { CreateGraphInput } from './CreateGraphInput'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
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

  beforeAll(async () => {
    await setupTestModule(app, GraphModule)
  })

  afterAll(async () => {
    await teardownTestModule(app)
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
