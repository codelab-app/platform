import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { AppModule } from '@codelab/modules/app-api';
import { print } from 'graphql';
import { CreatePageGql, CreatePageMutationVariables, DeletePageGql } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';
import { createApp } from './testHelpers';
import { PageModule } from '@codelab/modules/page-api';
import { createPage } from './create-page/create-page.i.spec';

describe('PageModule', () => {
  let nestApplication: INestApplication
  let app: any
  let page: any

  beforeAll(async () => {
    nestApplication = await setupTestModule(true, AppModule, PageModule)
    page = await createPage(nestApplication)
    app = await createApp()
    await nestApplication.close()
    nestApplication = await setupTestModule(false, AppModule, PageModule)
  })

  afterAll(async () => {
    await teardownTestModule(nestApplication)
  })

  describe('CreatePage', () => {
    it('should fail to create page for guest', async () => {
      const variables: CreatePageMutationVariables = {
        input: {
          appId: app.id,
          name: 'Test Page'
        }
      }
      await request(nestApplication.getHttpServer())
        .send({
          query: print(CreatePageGql),
          variables
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })
  describe('DeletePage', () => {
    it('should fail to delete page for guest', async () => {
      await request(nestApplication.getHttpServer())
        .send({
          query: print(DeletePageGql),
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
  describe.skip('GetPage', () => {
    it('should fail to get page for guest', async () => {})
  })
  describe.skip('GetPageOwner', () => {
    it('should fail to get page owner for guest', async () => {})
  })
  describe.skip('GetPageRoot', () => {
    it('should fail to get page root for guest', async () => {})
  })
  describe.skip('UpdatePage', () => {
    it('should fail to update page for guest', async () => {})
  })
})
