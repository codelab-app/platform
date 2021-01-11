import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { RegisterUserInput } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { UserDto } from '../../../../../../user/src/presentation/UserDto'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { DeleteAppRequest } from './DeleteAppRequest'
import { TestInfrastructureModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

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

const deleteAppMutation = (deleteAppRequest: DeleteAppRequest) => `
  mutation {
    deleteApp(input: { appId: "${deleteAppRequest.appId}" }) {
      title
    }
  }
`

describe('DeleteAppUseCase', () => {
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
    await app.close()
  })

  it('should delete app', async () => {
    const createAppMutation = `
      mutation {
        createApp(input: { title: "Test App" }) { id title }
      }
    `
    const createAppReq = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: createAppMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
    const { id } = createAppReq.body.data.createApp

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: deleteAppMutation({ appId: id }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteApp.title).toEqual('Test App')
      })
  })

  it('should return error for wrong app id', async () => {
    const wrongAppId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: deleteAppMutation({ appId: wrongAppId }),
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app with id ${wrongAppId} was not found`)
      })
  })
})
