import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { AppModule } from '@codelab/modules/app-api';
import { Auth0Service } from '@codelab/modules/auth-api';
import { createApp } from '../create-app/create-app.i.spec';
import { print } from 'graphql';
import { GetAppGql, GetAppQuery, GetAppQueryResult } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('GetApp', () => {
  let nestApplication: INestApplication
  let accessToken = ''
  let app: any

  beforeAll(async () => {
    nestApplication = await setupTestModule(nestApplication, AppModule)

    const auth0Service = nestApplication.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
    app = await createApp(accessToken, nestApplication)
    const a = ''
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should not get app for a guest', async () => {
    await request(nestApplication.getHttpServer())
      .send({
        query: print(GetAppGql),
        variables: {
          input: {
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })
  it('should get app for authorized user', async () => {
    await request(nestApplication.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetAppGql),
        variables: {
          input: {
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<GetAppQueryResult>) => {
        const responseApp = (res.body.data as GetAppQuery)?.app
        expect(responseApp).toMatchObject({
          id: app.id,
          name: 'Test App'
        })
      })
  })

})
