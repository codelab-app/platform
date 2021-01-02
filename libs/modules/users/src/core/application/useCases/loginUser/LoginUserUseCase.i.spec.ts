import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Connection } from 'typeorm'
import { TestInfrastructureModule } from '@codelab/backend'
import { UsersModule } from '@codelab/modules/users'

describe.skip('LoginUserUseCase', () => {
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

  afterAll(async () => {
    await connection.close()
    await app.close()
  })

  beforeEach(async () => {
    await connection.query('DELETE FROM "user"')
  })

  it('should successfully login', async () => {
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
        expect(res.body.data.register.email).toEqual(email)
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
  })

  it('should return error message for wrong password', async () => {
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
        expect(res.body.data.register.email).toEqual(email)
      })

    const loginQuery = `
      {
        login(request: {email: "${email}", password: "wrong password"}) {
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
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(`Wrong Password`)
      })
  })

  it('should return error given wrong email', async () => {
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
        expect(res.body.data.register.email).toEqual(email)
      })

    const loginQuery = `
      {
        login(request: {email: "wrong@gmail.com", password: "${password}"}) {
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
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `Theres no email wrong@gmail.com associated with any account`,
        )
      })
  })
})
