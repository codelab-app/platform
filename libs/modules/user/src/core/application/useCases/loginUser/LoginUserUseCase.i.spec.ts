import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserInput } from '../registerUser/RegisterUserInput'
import { LoginUserRequest } from './LoginUserRequest'
import { TestInfrastructureModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

export const registerUserMutation = (registerUserInput: RegisterUserInput) => `
  mutation {
    registerUser(input: {
      email: "${registerUserInput.email}",
      password: "${registerUserInput.password}"
    }) {
      email
      accessToken
    }
  }`

const loginUserQuery = (loginUserRequest: LoginUserRequest) => `
  mutation {
    loginUser(request: {
      email: "${loginUserRequest.email}",
      password: "${loginUserRequest.password}"
    }) {
      email
      accessToken
    }
  }`

describe('LoginUserUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let user: any

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()

    user = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
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
        const errorMsg = res.body.errors[0].message

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
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email wrong@gmail.com associated with any account`,
        )
      })
  })
})
