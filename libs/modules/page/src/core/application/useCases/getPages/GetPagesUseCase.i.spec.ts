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
  GetPagesGql,
  RegisterUserGql,
} from '@codelab/generated'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe('GetPagesUseCase', () => {
  let nestApp: INestApplication
  let user: User
  let page: Page
  let app: App

  beforeAll(async () => {
    nestApp = await setupTestModule(
      nestApp,
      PageModule,
      GraphModule,
      UserModule,
      AppModule,
    )

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

  it('should retrieve pages for user', async () => {
    expect(true).toBeTruthy()

    await request(nestApp.getHttpServer())
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

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(CreatePageGql),
        variables: {
          input: {
            title: 'Page 2',
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.createPage.title).toEqual('Page 2')
      })

    await request(nestApp.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: print(GetPagesGql),
        variables: {
          input: {
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.getPages.length).toEqual(3)
      })
  })
})
