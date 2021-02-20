import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { Page } from '../../../domain/Page'
import { request, setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  CreateAppGql,
  CreatePageGql,
  RegisterUserGql,
  UpdatePageGql,
} from '@codelab/generated'
import { App, AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('UpdatePageUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let app: App

  beforeAll(async () => {
    nestApp = await setupTestModule(nestApp, GraphModule, UserModule, AppModule)

    // Register user
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
  })

  afterAll(async () => {
    await teardownTestModule(nestApp)
  })

  it('should update page for authenticated user', async () => {
    const title = 'Test App'
    const { accessToken } = user

    app = await request(nestApp.getHttpServer())
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
    const { id } = app

    const page = await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const pageRes: Page = res.body.data.createPage

        expect(pageRes).toMatchObject({
          title: 'Page 1',
        })
      })
      .then((res) => res.body.data.createPage)

    await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(UpdatePageGql),
        variables: {
          input: {
            title: 'Page 1 Updated',
            pageId: page.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const pageRes: Page = res.body.data.updatePage

        expect(pageRes).toMatchObject({
          title: 'Page 1 Updated',
        })
      })
  })

  it('should not update page for guest user', async () => {
    const page = await request(nestApp.getHttpServer())
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
        const pageRes: Page = res.body.data.createPage

        expect(pageRes).toMatchObject({
          title: 'Page 1',
        })
      })
      .then((res) => res.body.data.createPage)

    await request(nestApp.getHttpServer())
      .set('Authorization', '')
      .send({
        query: print(UpdatePageGql),
        variables: {
          input: {
            pageId: page.id,
            title: 'Page 2',
          },
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.errors[0].extensions.code).toBe('UNAUTHENTICATED')
      })
  })

  it('should return error for wrong page id', async () => {
    const wrongPageId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'

    await request(nestApp.getHttpServer())
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(UpdatePageGql),
        variables: {
          input: {
            title: 'Page 2',
            pageId: wrongPageId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(`Update page failed`)
      })
  })
})
