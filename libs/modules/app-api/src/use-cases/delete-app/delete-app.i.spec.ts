import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { AppModule } from '@codelab/modules/app-api';
import { Auth0Service } from '@codelab/modules/auth-api';
import { createApp } from '../create-app/create-app.i.spec';
import { print } from 'graphql';
import { DeleteAppGql, DeleteAppMutation, DeleteAppMutationResult } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('DeleteApp', () => {
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
    await teardownTestModule(nestApplication)
  })

  it('should fail to delete app for guest', async () => {
    await request(nestApplication.getHttpServer())
      .send({
        query: print(DeleteAppGql),
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

  it('should delete app for authorized user', async () => {
    await request(nestApplication.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(DeleteAppGql),
        variables: {
          input: {
            appId: app.id,
          },
        },
      })
      .expect(200)
      .expect((res: ApiResponse<DeleteAppMutationResult>) => {
        const deleteAppResult = (res.body.data as DeleteAppMutation)?.deleteApp
        expect(deleteAppResult).toMatchObject({
          id: app.id
        })
      })
    })

})
