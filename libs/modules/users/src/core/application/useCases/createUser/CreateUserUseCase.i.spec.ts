import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/users'

const email = 'test_user@codelab.ai'

const createUserMutation = `
mutation {
  createUser(user:
    {
      email: "${email}",
      password: "password"
    }) { email}
}`

describe.skip('CreateUserUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
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
    await connection.query('DELETE FROM "user"')
  })

  afterEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  it('should create a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({
          email: 'admin@codelab.ai',
        })
      })
  })

  it('should raise an error given an existing email', async () => {
    const createNewUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createUser).toEqual({
          email: 'test_user@codelab.ai',
        })
      })
    const createExistingUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: createUserMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `The email admin@codelab.ai associated for this account already exists`,
        )
      })
  })
})
