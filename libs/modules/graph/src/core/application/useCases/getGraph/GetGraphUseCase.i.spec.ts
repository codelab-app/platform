import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { GraphModule } from '../../../../framework/nestjs/GraphModule'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import { CreateGraphGql, GetGraphGql } from '@codelab/generated'

describe('GetGraphUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule(app, GraphModule)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should get existing graph', async () => {
    const label = 'Graph 1'

    const createdGraph = await request(app.getHttpServer())
      .send({
        query: print(CreateGraphGql),
        variables: {
          input: {
            label,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createGraph.label).toEqual(label)
        expect(res.body.data.createGraph.id).toBeDefined()
      })
      .then((res) => res.body.data.createGraph)

    await request(app.getHttpServer())
      .send({
        query: print(GetGraphGql),
        variables: {
          input: {
            id: createdGraph.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getGraph.label).toEqual(label)
        expect(res.body.data.getGraph.id).toBeDefined()
      })
  })

  it('should return error for wrong graph id', async () => {
    const wrongGraphId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .send({
        query: print(GetGraphGql),
        variables: {
          input: {
            id: wrongGraphId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Graph with id ${wrongGraphId} was not found`)
      })
  })
})
