import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { App } from '../../../../../../app/src/core/domain/App'
import { PageModule } from '../../../../framework/nestjs/PageModule'
import { Page } from '../../../domain/Page'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import {
  CreateAppGql,
  CreatePageGql,
  GetPageGql,
  RegisterUserGql,
} from '@codelab/generated'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetPageUseCase', () => {
  let app: INestApplication
  let user: User
  let page: Page

  beforeAll(async () => {
    app = await setupTestModule(
      app,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )

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

    const title = 'Test App'
    const { accessToken } = user

    const createApp: App = await request(app.getHttpServer())
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

    page = await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 1',
            appId: createApp.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 1')
      })
      .then((res) => res.body.data.createPage)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should get page for authenticated user', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPageGql),
        variables: {
          input: {
            pageId: page.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getPage.title).toEqual('Page 1')
      })
  })

  it('should return error for wrong page id', async () => {
    const wrongPageId = '85e3fd3a-9dde-4c80-bd07-8cf126799698'

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPageGql),
        variables: {
          input: {
            pageId: wrongPageId,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The page with id ${wrongPageId} has not been found`,
        )
      })
  })
})
