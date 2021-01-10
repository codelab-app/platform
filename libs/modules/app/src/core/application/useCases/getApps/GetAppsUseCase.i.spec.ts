import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'

describe.skip('GetAppsUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  // beforeEach(async () => {
  //   await connection.query('DELETE FROM "graph"')
  // })

  afterAll(async () => {
    await app.close()
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
