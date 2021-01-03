import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { UsersModule } from '@codelab/modules/users'

describe.skip('GetMeUseCase', () => {
  let app: INestApplication
  let connection: Connection

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UsersModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await app.init()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  it('should get user with JWT token passed in header', async () => {
    const email = 'test_user@codelab.ai'
    const password = 'password'
    const registerUserMutation = `
      mutation {
        registerUser(request:
          {
            email: "${email}",
            password: "${password}"
          }) { email accessToken }
    }`

    const createNewUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: registerUserMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })

    const loginQuery = `
      {
        login(request: {email: "${email}", password: "${password}"}) {
          email
          accessToken
        }
       }
    `

    const loginUser = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: loginQuery,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.login.email).toEqual(email)
        expect(res.body.data.login.accessToken).toBeDefined()
      })
    const { accessToken } = loginUser.body.data.login
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
