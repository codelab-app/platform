import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { UserModule } from '../../../../framework/nestjs/UserModule'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import { GetMeGql, RegisterUserGql } from '@codelab/generated'
import { User } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetMeUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule)

    user = await request(app.getHttpServer())
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
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetMeGql),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getMe.email).toEqual(email)
      })
  })
})
