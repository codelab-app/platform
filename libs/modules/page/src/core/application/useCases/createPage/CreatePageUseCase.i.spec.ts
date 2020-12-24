import { INestApplication } from '@nestjs/common'
import { Connection } from 'typeorm'

describe('CreatePageUseCase', () => {
  let app: INestApplication
  let connection: Connection

  // beforeAll(async () => {
  //   const testModule = await Test.createTestingModule({
  //     imports: [TestInfrastructureModule],
  //   }).compile()

  //   app = testModule.createNestApplication()
  //   connection = app.get(Connection)
  //   await app.init()
  // })

  // afterAll(async () => {
  //   await connection.close()
  //   await app.close()
  // })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })
})
