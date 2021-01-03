import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { AuthModule } from '../../../../framework/nestjs/AuthModule'
import { RegisterUserRequest } from './RegisterUserRequest'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const registerUserMutation = (registerUserRequest: RegisterUserRequest) => `
  mutation {
    registerUser(request: {
      email: "${registerUserRequest.email}",
      password: "${registerUserRequest.password}"
    }) {
      email
      accessToken
    }
  }`

describe('RegisterUserUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule, AuthModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  afterAll(async () => {
    await connection.query('DELETE FROM "user"')
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  it('should create a user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })
  })

  it('should raise an error given an existing email', async () => {
    // Create a user
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data?.registerUser.email).toEqual(email)
      })

    // Create another user
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `The email ${email} associated for this account already exists`,
        )
      })
  })
})
