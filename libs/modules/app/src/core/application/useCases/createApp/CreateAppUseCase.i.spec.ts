import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserRequest } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserRequest'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { CreateAppRequest } from './CreateAppRequest'
import { TestInfrastructureModule } from '@codelab/backend'
import { UserDto, UserModule } from '@codelab/modules/user'

export const registerUserMutation = (
  registerUserRequest: RegisterUserRequest,
) => `
  mutation {
    registerUser(request: {
      email: "${registerUserRequest.email}",
      password: "${registerUserRequest.password}"
    }) {
      email
      accessToken
    }
  }`

const createAppMutation = (createAppRequest: CreateAppRequest) => `
  mutation {
    createApp(request: {
      title: "${createAppRequest.title}",
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

  // beforeEach(async () => {})

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
      .send({
        query: createAppMutation({ title }),
      })
      .expect(200)
      .then((res) => {
        console.log(res.body.data)
      })
  })
})
