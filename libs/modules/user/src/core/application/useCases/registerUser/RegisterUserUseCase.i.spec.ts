import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserGql } from './RegisterUser.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('RegisterUserUseCase', () => {
  let app: INestApplication

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should create a user', async () => {
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
      .expect(200)
      .expect((res) => {
        expect(res.body.data.registerUser.email).toEqual(email)
      })
  })

  it('should raise an error given an existing email', async () => {
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
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body?.errors[0].message

        expect(errorMsg).toEqual(
          `The email ${email} associated for this account already exists`,
        )
      })
  })
})
