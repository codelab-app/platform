import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { EdgeModule } from '@codelab/modules/edge'
import { GraphModule } from '@codelab/modules/graph'
import { VertexModule } from '@codelab/modules/vertex'

describe.skip('CreateEdgeUseCase', () => {
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
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')
  })

  afterEach(async () => {
    await connection.query('DELETE FROM edge')
    await connection.query('DELETE FROM graph')
  })

  it('should create an edge', () => {
    expect(true).toBeTruthy()
  })
})
