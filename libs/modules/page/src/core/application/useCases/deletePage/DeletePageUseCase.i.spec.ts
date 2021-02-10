import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { Page } from '../../../domain/Page'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  CreateAppGql,
  CreatePageGql,
  DeletePageGql,
  RegisterUserGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('DeletePageUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let page: Page
  let app: App

  beforeAll(async () => {
    nestApp = await setupTestModule(nestApp, GraphModule, UserModule, AppModule)

    // Register user
    user = await request(nestApp.getHttpServer())
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

    const title = 'Test App'
    const { accessToken } = user

    app = await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
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
        expect(res.body.data.createApp.title).toEqual('Test App')
      })
      .then((res) => res.body.data.createApp)
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should delete existing page', async () => {
    page = await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })
      .then((res) => res.body.data.createPage)

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeletePageGql),
        variables: {
          input: { pageId: page.id },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletePage.title).toEqual('Page 1')
      })
  })

  it('should not delete last page', async () => {
    page = await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })
      .then((res) => res.body.data.createPage)

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeletePageGql),
        variables: {
          input: { pageId: page.id },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletePage.title).toEqual('Page 1')
      })

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeletePageGql),
        variables: {
          input: { pageId: app.pages[0].id },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Cannot delete last page`)
      })
  })

  it('should return error for wrong page id', async () => {
    const wrongPageId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(DeletePageGql),
        variables: {
          input: { pageId: wrongPageId },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Cannot delete page`)
      })
  })
})
