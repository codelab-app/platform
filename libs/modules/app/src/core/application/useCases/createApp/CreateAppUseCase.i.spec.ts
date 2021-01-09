import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserInput } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { CreateAppInput } from './CreateAppInput'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserDto, UserModule } from '@codelab/modules/user'

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

const createAppMutation = (createAppInput: CreateAppInput) => `
  mutation {
    createApp(input: {
      title: "${createAppInput.title}",
    }) {
      title
    }
  }`

const email = 'test_user@codelab.ai'
const password = 'password'

describe('CreateAppUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let user: UserDto

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, AppModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)

    await connection.synchronize(true)
    await app.init()

    // Register user
    user = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  it('should create an app for the an authenticated user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: createAppMutation({ title }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(title)
      })
  })

  it('should create not create an app for a guest user', async () => {
    const title = 'My App'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('authorization', '')
      .send({
        query: createAppMutation({ title }),
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })
})
