import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { Role } from '@codelab/backend/adapters'
import {
  __AppFragment,
  CreatePageGql,
  CreatePageMutationVariables,
  PageBaseFragment,
} from '@codelab/codegen/graphql'
import { AppModule, createApp } from '@codelab/modules/app-api'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { createPage } from '../../helpers/create-page'
import { PageModule } from '../../page.module'

describe('CreatePage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let app: __AppFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule, PageModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([AppModule, PageModule], {
      role: Role.USER,
    })
    app = await createApp(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a page', async () => {
      await createPage(userApp)

      const variables: CreatePageMutationVariables = {
        input: {
          appId: app.id,
          name: 'Test Page',
        },
      }

      await request(guestApp.getHttpServer())
        .send({
          query: print(CreatePageGql),
          variables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should create a page', async () => {
      const result: { app: __AppFragment; page: PageBaseFragment } =
        await createPage(userApp)

      expect(result.page.id).toBeDefined()
      // expect(result.page.name).toEqual('Test Page')
      // expect(result.page.app).toMatchObject(result.app)
      expect(result.page).toMatchObject({
        name: 'Test Page',
        app: result.app,
      })
    })
  })
})
