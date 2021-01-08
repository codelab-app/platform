import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { LoginUserRequest } from '../loginUser/LoginUserRequest'
import { RegisterUserInput } from '../registerUser/RegisterUserInput'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

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

const registerUserMutation = (registerUserInput: RegisterUserInput) => `
  mutation {
    registerUser(input: {
      email: "${registerUserInput.email}",
      password: "${registerUserInput.password}"
    }) {
      email
      accessToken
    }
  }`

describe('GetMeUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()
  })

  beforeEach(async () => {
    await connection.synchronize(true)
  })

  afterAll(async () => {
    await connection.synchronize(true)
    await connection.close()
    await app.close()
  })

  it('should get user with JWT token passed in header', async () => {
    const createNewUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })

    const loginUser: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.loginUser.email).toEqual(email)
        expect(res.body.data.loginUser.accessToken).toBeDefined()
      })
    const { accessToken } = loginUser.body.data.loginUser
    const getMeQuery = `{getMe { email }}`
    const getMeRequest = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: getMeQuery,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getMe.email).toEqual(email)
      })
  })
})
