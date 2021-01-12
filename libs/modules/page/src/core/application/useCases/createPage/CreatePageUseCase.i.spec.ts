import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '../../../../../../../backend/src/framework/nestjs/test-infrastructure.module'
import { AppModule } from '../../../../../../app/src/framework/nestjs/AppModule'
import { GraphModule } from '../../../../../../graph/src/framework/nestjs/GraphModule'
import { LoginUserInput } from '../../../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { RegisterUserInput } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { PageModule } from '../../../../framework/nestjs/PageModule'

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
    await app.close()
  })

  // it('should be true', () => {
  //   expect(true).toBeTruthy()
  // })

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
        createApp(input: {title: "Test App"}) { id title }
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
        createPage(input: {title: "Page 1", appId: "${id}"}) { id title }
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
      graph(input:{pageId: "${pageId}"}) { id vertices { id type } }
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

  it.skip('should find graph', async () => {
    const graphQuery = `{
      graph(input:{pageId: "227572eb-0de9-459f-b0af-16cd482919f7"}) { vertices { id type } }
    }`
    const getGraphForPageReq = await request(app.getHttpServer())
      .post('/graphql')
      // .set('Authorization', `Bearer ${accessToken}`)
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
