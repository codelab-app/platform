import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { AppModule } from '@codelab/modules/app-api';
import { Auth0Service } from '@codelab/modules/auth-api';
import { createApp } from '../create-app/create-app.i.spec';
import { print } from 'graphql';
import { GetAppsGql, GetAppsQuery, GetAppsQueryResult } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('GetApps', () => {
  let nestApplication: INestApplication
  let accessToken = ''
  let app: any

  beforeAll(async () => {
    nestApplication = await setupTestModule(nestApplication, AppModule)

    const auth0Service = nestApplication.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
    app = await createApp(accessToken, nestApplication)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should not get apps for guest', async () => {
    await request(nestApplication.getHttpServer())
      .send({
        query: print(GetAppsGql),
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should get apps for authorized user', async () => {
    await request(nestApplication.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(GetAppsGql),
      })
      .expect(200)
      .expect((res: ApiResponse<GetAppsQueryResult>) => {
          const responseApps = (res.body.data as GetAppsQuery)?.apps
          expect(responseApps).toMatchObject([{
            id: app.id,
            name: 'Test App'
          }])
      })
  })
})
