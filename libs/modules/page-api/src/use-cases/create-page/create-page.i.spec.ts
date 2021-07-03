import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { PageModule } from '../../page.module';
import { print } from 'graphql';
import {
  __AppFragment,
  CreatePageGql,
  CreatePageMutation,
  CreatePageMutationVariables,
  PageBaseFragment
} from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';
import { createApp } from '../testHelpers';
import { AppModule } from '@codelab/modules/app-api';

export const createPage = async (nestApplication: INestApplication, accessToken: string = '',): Promise<{ app: __AppFragment, page: PageBaseFragment }> => {
  const app: __AppFragment = await createApp(accessToken)
  const variables: CreatePageMutationVariables  = {
    input: {
      appId: app.id,
      name: 'Test Page'
    }
  }

  const page = await request(nestApplication.getHttpServer())
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: print(CreatePageGql),
      variables
    })
    .expect(200)
    .then((res) => (res.body.data as CreatePageMutation)?.createPage)
  return {
    app, page
  }
}

describe('CreatePage', () => {
  let nestApplication: INestApplication
  let app: any

  // beforeAll(async () => {
  //   nestApplication = await setupTestModule(true, PageModule)
  //
  //   const auth0Service = nestApplication.get(Auth0Service)
  //   // accessToken = await auth0Service.getAccessToken()
  //   app = await createApp(nestApplication)
  // })

  // afterAll(async () => {
  //   await teardownTestModule(nestApplication)
  // })

  afterEach(async () => {
    await teardownTestModule(nestApplication)
  })

  it.skip('should fail to create page for guest', async () => {
    app = await createApp()
    nestApplication = await setupTestModule(false, AppModule, PageModule)
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

  it('should create page for authorized user', async () => {
    nestApplication = await setupTestModule(true, AppModule, PageModule)
    const result: { app: __AppFragment, page: PageBaseFragment } = await createPage(nestApplication)
    expect(result.page.id).toBeDefined()
    expect(result.page.name).toEqual('Test Page')
    expect(result.page.app).toMatchObject(result.app)
  })
})
