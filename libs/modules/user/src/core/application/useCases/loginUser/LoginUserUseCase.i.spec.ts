import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { LoginUserGql, RegisterUserGql } from '@codelab/generated'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('LoginUserUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it.only('should successfully login', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(LoginUserGql),
        variables: {
          input: {
            email,
            password,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.loginUser.email).toEqual(email)
        expect(res.body.data.loginUser.accessToken).toBeDefined()
      })
  })

  it('should return error message for wrong password', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(LoginUserGql),
        variables: {
          input: {
            email,
            password: 'wrong-password',
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual('Incorrect email & password combination')
      })
  })

  it('should return error given wrong email', async () => {
    const wrongEmail = 'wrong-email@codelab.ai'

    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(LoginUserGql),
        variables: {
          input: {
            email: wrongEmail,
            password,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual('Incorrect email & password combination')
      })
  })
})
