import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { RegisterUserGql } from '../registerUser/RegisterUser.generated'
import { GetMeGql } from './GetMe.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { UserDto } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetMeUseCase', () => {
  let app: INestApplication
  let user: UserDto

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)

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
      .then((res) => {
        return res.body.data.registerUser
      })
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should get user with JWT token passed in header', async () => {
    const { accessToken } = user

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetMeGql),
      })
      .expect(200)
      .expect((res) => {
        console.log(res.body)
        expect(res.body.data.getMe.email).toEqual(email)
      })
  })
})
