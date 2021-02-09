import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { User } from '../../../../../../user/src/core/domain/User'
import { UserModule } from '../../../../../../user/src/framework/nestjs/UserModule'
import { AppModule } from '../../../../framework/nestjs/AppModule'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  CreateAppGql,
  CreatePageGql,
  DeleteAppGql,
  GetAppGql,
  GetPageGql,
  RegisterUserGql,
} from '@codelab/generated'
import { App } from '@codelab/modules/app'
import { PageModule } from '@codelab/modules/page'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('DeleteAppUseCase', () => {
  let app: INestApplication
  let user: User

  beforeAll(async () => {
    app = await setupTestModule(app, UserModule, AppModule, PageModule)

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

  it('should delete app', async () => {
    const { id }: App = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables: {
          input: { title: 'Test App' },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
      .then((res) => res.body.data.createApp)

    const createdApp = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetAppGql),
        variables: {
          input: { appId: id },
        },
      })
      .expect(200)
      .expect((res) => {
        const appResult = res.body.data.getApp

        expect(appResult).toMatchObject({
          title: 'Test App',
          pages: [
            {
              title: 'Home',
            },
          ],
        })
      })
      .then((res) => res.body.data.getApp)

    const page1Id = createdApp.pages[0].id

    const page2 = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 2',
            appId: createdApp.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 2')
      })
      .then((res) => res.body.data.createPage)

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeleteAppGql),
        variables: {
          input: { id },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deleteApp.title).toEqual('Test App')
      })

    const deletedApp = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetAppGql),
        variables: {
          input: { appId: id },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app with id ${id} has not been found`)
      })

    const deletedPage1 = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPageGql),
        variables: {
          input: { pageId: page1Id },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The page with id ${page1Id} has not been found`,
        )
      })

    const deletedPage2 = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPageGql),
        variables: {
          input: { pageId: page2.id },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The page with id ${page2.id} has not been found`,
        )
      })
  })

  it('should return error for wrong app id', async () => {
    const wrongAppId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeleteAppGql),
        variables: {
          input: { id: wrongAppId },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`The app with id ${wrongAppId} was not found`)
      })
  })
})
