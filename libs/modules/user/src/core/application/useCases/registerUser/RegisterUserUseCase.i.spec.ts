import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserInput } from './RegisterUserInput'
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

describe('RegisterUserUseCase', () => {
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

  beforeEach(async () => {
    await connection.synchronize(true)
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
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
        expect(res.body.data.registerUser.email).toEqual(email)
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
