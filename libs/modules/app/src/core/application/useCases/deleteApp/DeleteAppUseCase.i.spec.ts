import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { LoginUserRequest } from '../../../../../../user/src/core/application/useCases/loginUser/LoginUserRequest'
import { RegisterUserInput } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { TestInfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
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

describe('DeleteAppUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, AppModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM app')
    await connection.query('DELETE FROM "user"')
  })

  afterAll(async () => {
    await connection.query('DELETE FROM app')
    await connection.query('DELETE FROM "user"')
    await connection.close()
    await app.close()
  })

  it('should delete app', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect((res: any) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })

    const loginUserReq: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.loginUser.email).toEqual(email)
        expect(res.body.data.loginUser.accessToken).toBeDefined()
      })
    const { accessToken } = loginUserReq.body.data.loginUser
    const createAppMutation = `
      mutation {
        createApp(input: { title: "Test App" }) { id title }
      }
    `
    const createAppReq = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: createAppMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
    const { id } = createAppReq.body.data.createApp
    const deleteAppMutation = `
      mutation {
        deleteApp(request: { appId: "${id}" }) {
          title
        }
      }
    `

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: deleteAppMutation,
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
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect((res: any) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })

    const loginUserReq: any = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginUserQuery({ email, password }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.loginUser.email).toEqual(email)
        expect(res.body.data.loginUser.accessToken).toBeDefined()
      })
    const { accessToken } = loginUserReq.body.data.loginUser
    const deleteAppMutation = `
      mutation {
        deleteApp(request: { appId: "${wrongAppId}" }) {
          title
        }
      }
    `

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: deleteAppMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app with id ${wrongAppId} was not found`)
      })
  })
})
