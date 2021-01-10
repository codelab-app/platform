import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { LoginUserRequest } from '../../../../../../user/src/core/application/useCases/loginUser/LoginUserRequest'
import { RegisterUserRequest } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserRequest'
import { TestInfrastructureModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
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

describe.skip('CreatePageUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        TestInfrastructureModule,
        PageModule,
        GraphModule,
        UserModule,
        AppModule,
      ],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()
  })

  afterAll(async () => {
    // await connection.synchronize(true)

    await app.close()
  })

  it('should create page with graph and a root vertex', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation({ email, password }),
      })
      .expect((res: any) => {
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
    const createAppMutation = `
      mutation {
        createApp(request: {title: "Test App"}) { id title }
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
    const createPageMutation = `
      mutation {
        createPage(request: {title: "Page 1", appId: "${id}"}) { id title }
      }
    `
    const createPageReq = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: createPageMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })
    const pageId = createPageReq.body.data.createPage.id
    const graphQuery = `{
      graph(request:{pageId: "${pageId}"}) { vertices { id type } }
    }`
    const getGraphForPageReq = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: graphQuery,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.graph.vertices.length).toEqual(1)
        expect(res.body.data.graph.vertices[0].type).toEqual(
          'React_Grid_Layout_Container',
        )
      })
  })
})
