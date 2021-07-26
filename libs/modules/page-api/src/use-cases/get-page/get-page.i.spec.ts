import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AppFragment,
  GetPageGql,
  GetPageQuery,
  GetPageQueryResult,
  PageBaseFragment,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { createPage } from '../../helpers/create-page'
import { PageModule } from '../../page.module'

describe('GetPage', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let page: { app: __AppFragment; page: PageBaseFragment }

  beforeAll(async () => {
    guestApp = await setupTestModule([PageModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([PageModule], {
      role: Role.USER,
    })
    page = await createPage(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should not get a page', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetPageGql),
          variables: {
            input: {
              pageId: page.page.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should get a page', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(GetPageGql),
          variables: {
            input: {
              pageId: page.page.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<GetPageQueryResult>) => {
          const responsePage = (res.body.data as GetPageQuery)?.page

          expect(responsePage).toMatchObject({
            id: page.page.id,
            name: page.page.name,
            app: page.app,
          })
        })
    })
  })
})
