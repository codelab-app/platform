import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserRequest } from '../registerUser/RegisterUserRequest'
import { LoginUserRequest } from './LoginUserRequest'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const loginUserQuery = (loginUserRequest: LoginUserRequest) => `
  query {
    loginUser(request: {
      email: "${loginUserRequest.email}",
      password: "${loginUserRequest.password}"
    }) {
      email
      accessToken
    }
  }`

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

describe('LoginUserUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()

    await connection.query('DELETE FROM "user"')

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect((res) => {
        expect(res.body.data?.registerUser.email).toEqual(email)
      })
  })

  afterAll(async () => {
    await connection.query('DELETE FROM "user"')
    await connection.close()
    await app.close()
  })

  it('should successfully login', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.loginUser.email).toEqual(email)
        expect(res.body.data.loginUser.accessToken).toBeDefined()
      })
  })

  it('should return error message for wrong password', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email, password: 'wrong-password' }),
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(`Wrong Password`)
      })
  })

  it('should return error given wrong email', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email: 'wrong@gmail.com', password }),
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email wrong@gmail.com associated with any account`,
        )
      })
  })
})
