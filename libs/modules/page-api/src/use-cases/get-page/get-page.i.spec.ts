import { INestApplication } from '@nestjs/common';
import {
  __AppFragment,
  GetPageQueryResult,
  GetPageGql,
  PageBaseFragment,
  GetPageQuery
} from '@codelab/codegen/graphql';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { PageModule } from '@codelab/modules/page-api';
import { Auth0Service } from '@codelab/modules/auth-api';
import { createPage } from '../create-page/create-page.i.spec';
import { print } from 'graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('GetPage', () => {
  let nestApplication: INestApplication
  let accessToken = ''
  let page: { app: __AppFragment, page: PageBaseFragment }

  beforeAll(async () => {
    nestApplication = await setupTestModule(nestApplication, PageModule)

    const auth0Service = nestApplication.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
    page = await createPage(accessToken, nestApplication)
  })

  afterAll(async () => {
    await teardownTestModule(nestApplication)
  })

  it('should not get page for a guest', async () => {
    await request(nestApplication.getHttpServer())
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
  it('should get page for authorized user', async () => {
    await request(nestApplication.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
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
          app: page.app
        })
      })
  })

})
