import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { print } from 'graphql'
import request from 'supertest'
import { Connection } from 'typeorm'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserGql } from '../registerUser/RegisterUser.generated'
import { LoginUserGql } from './LoginUser.generated'
import { TestInfrastructureModule } from '@codelab/backend'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('LoginUserUseCase', () => {
  let app: INestApplication
  let connection: Connection
  let user: any

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [TestInfrastructureModule, UserModule],
    }).compile()

    app = testModule.createNestApplication()
    connection = app.get(Connection)
    await connection.synchronize(true)
    await app.init()

    user = await request(app.getHttpServer())
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
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should successfully login', async () => {
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

        expect(errorMsg).toEqual(`Wrong Password`)
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

        expect(errorMsg).toEqual(
          `Theres no email ${wrongEmail} associated with any account`,
        )
      })
  })
})
