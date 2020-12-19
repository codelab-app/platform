import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'

describe('DeleteVertexUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule],
    }).compile()

    app = testModule.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    const connection = app.get(Connection)

    await connection.close()
    await app.close()
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
