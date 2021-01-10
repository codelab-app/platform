import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { registerUserMutation } from '../registerUser/RegisterUserUseCase.i.spec'
import { LoginUserInput } from './LoginUserInput'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

const loginUserQuery = (loginUserInput: LoginUserInput) => `
  mutation {
    loginUser(input: {
      email: "${loginUserInput.email}",
      password: "${loginUserInput.password}"
    }) {
      email
      accessToken
    }
  }`

describe.skip('LoginUserUseCase', () => {
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

  afterAll(async () => {
    await connection.synchronize(true)
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.synchronize(true)
  })

  describe('Should successfully login', () => {
    it('should successfully login', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: registerUserMutation({ email, password }),
        })
        .expect((res) => {
          expect(res.body.data.registerUser.email).toEqual(email)
        })

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
  })

  describe('return error message for wrong password', () => {
    it('should return error message for wrong password', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: registerUserMutation({ email, password }),
        })
        .expect((res) => {
          expect(res.body.data.registerUser.email).toEqual(email)
        })

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
  })

  describe('return error given wrong email', () => {
    it('should return error given wrong email', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: registerUserMutation({ email, password }),
        })
        .expect((res) => {
          expect(res.body.data.registerUser.email).toEqual(email)
        })

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
})
