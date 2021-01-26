import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import request from 'supertest'
import { CreateAppGql } from '../../../../../../app/src/core/application/useCases/createApp/CreateApp.generated'
import { App } from '../../../../../../app/src/core/domain/App'
import { RegisterUserGql } from '../../../../../../user/src/core/application/useCases/registerUser/RegisterUser.generated'
import { Page } from '../../../domain/Page'
import { CreatePageGql } from '../createPage/CreatePage.generated'
import { setupTestModule, teardownTestModule } from '@codelab/backend'
import { AppModule } from '@codelab/modules/app'
import { GraphModule } from '@codelab/modules/graph'
import { PageModule } from '@codelab/modules/page'
import { User, UserModule } from '@codelab/modules/user'

const email = 'test_user@codelab.ai'
const password = 'password'

describe.skip('DeletePageUseCase', () => {
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

  it('should delete existing page', async () => {
    const deletePageMutation = `
        mutation {
            deletePage(input: {
                pageId: "${page.id}"
            }) { title }
        }
      `

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: deletePageMutation,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.deletePage.title).toEqual('Page 1')
      })
      .then((res) => res.body.data.deletePage)
  })

  it('should return error for wrong page id', async () => {
    const wrongPageId = '8cd9c870-03f8-4031-8d7f-a6a6978f14b5'
    const deletePageMutation = `
        mutation {
            deletePage(input: {
                pageId: "${wrongPageId}"
            }) { title }
        }
      `

    await request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${user.accessToken}`)
      .send({
        query: deletePageMutation,
      })
      .expect(200)
      .expect((res) => {
        const errorMsg = res.body.errors[0].message

        expect(errorMsg).toEqual(
          `The page with id ${wrongPageId} was not found`,
        )
      })
  })
})
