import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { TestInfrastructureModule } from '@codelab/backend'

describe('GetPagesUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, PageModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
