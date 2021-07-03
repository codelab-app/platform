import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { PageModule } from '@codelab/modules/page-api';
import {
  __AppFragment,
  DeletePageGql,
  DeletePageMutation,
  DeletePageMutationResult,
  PageBaseFragment
} from '@codelab/codegen/graphql';
import { createPage } from '../create-page/create-page.i.spec';
import { print } from 'graphql';
import { AppModule } from '@codelab/modules/app-api';

describe('DeletePage', () => {
  let nestApplication: INestApplication
  let accessToken = ''
  let page: { app: __AppFragment, page: PageBaseFragment }

  beforeAll(async () => {
    nestApplication = await setupTestModule(true, AppModule, PageModule)
    page = await createPage(nestApplication)
  })

  afterEach(async () => {
    await teardownTestModule(nestApplication)
  })

  it('should delete page for authorized user', async () => {

    await request(nestApplication.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(DeletePageGql),
        variables: {
          input: {
            pageId: page.page.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<DeletePageMutationResult>) => {
        const deletePageResult = (res.body.data as DeletePageMutation)?.deletePage
        expect(deletePageResult).toMatchObject({
          id: page.page.id
        })
      })
  })

})
