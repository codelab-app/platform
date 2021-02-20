import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import { CreateAppGql, GetAppsGql, RegisterUserGql } from '@codelab/generated'
import { AppModule } from '@codelab/modules/app'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetAppsUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule, AppModule)

    // Register user
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
      .then((res) => res.body.data.registerUser)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should retrieve apps for user', async () => {
    const app1 = 'My App 1'
    const app2 = 'My App 2'

    const app1Req = await request(app.getHttpServer())
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: app1,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(app1)
      })

    const app2Req = await request(app.getHttpServer())
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: app2,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(app2)
      })
    const getAppsReq = await request(app.getHttpServer())
      .set('authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(GetAppsGql),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getApps.length).toEqual(2)
      })
  })
})
