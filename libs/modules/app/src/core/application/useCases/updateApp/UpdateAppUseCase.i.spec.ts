import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { App } from '../../../domain/App'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import { CreateAppGql, RegisterUserGql, UpdateAppGql } from '@codelab/generated'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const email2 = 'test_user2@codelab.ai'
const password = 'password'
const appTitleOld = 'My first app'

describe('UpdateAppUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let app: App

  beforeAll(async () => {
    nestApp = await setupTestModule(nestApp, UserModule, AppModule)

    user = await request(nestApp.getHttpServer())
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

    app = await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(CreateAppGql),
        variables: {
          input: {
            title: appTitleOld,
          },
        },
      })
      .then((res) => res.body.data.createApp)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should update an app for the authenticated user', async () => {
    const newTitle = 'My New App'

    await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}` ?? '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.updateApp.title).toEqual(newTitle)
      })
  })

  it('should not update an app for a guest user', async () => {
    const newTitle = 'My New App'

    await request(nestApp.getHttpServer())
      .set('Authorization', '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })

  it('should not update an app for another user', async () => {
    const newTitle = 'My New App'

    const user2 = await request(nestApp.getHttpServer())
      .send({
        query: print(RegisterUserGql),
        variables: {
          input: {
            email: email2,
            password,
          },
        },
      })
      .then((res) => res.body.data.registerUser)

    await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user2.accessToken}` ?? '')
      .send({
        query: print(UpdateAppGql),
        variables: {
          input: {
            id: app.id,
            title: newTitle,
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].message).toBe(
          `Unable to create app for user ${user2.email}`,
        )
      })
  })
})
