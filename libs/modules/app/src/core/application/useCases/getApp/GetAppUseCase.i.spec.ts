import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { App } from '../../../domain/App'
import { CreateAppGql } from '../createApp/CreateApp.generated'
import { GetAppGql } from './GetApp.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetAppUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule, AppModule)

    // Register user
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
    await teardownTestModule(app)
  })

  it('Should get app for authenticated user', async () => {
    const title = 'My App'

    const createApp: App = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual(title)
      })
      .then((res) => res.body.data.createApp)

    const { id } = createApp

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(GetAppGql),
        variables: {
          input: {
            appId: id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getApp.title).toEqual(title)
      })
  })
  it('should return error for wrong app id', async () => {
    const wrongAppId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(GetAppGql),
        variables: {
          input: {
            appId: wrongAppId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app ${wrongAppId} has not been found`)
      })
  })
})
