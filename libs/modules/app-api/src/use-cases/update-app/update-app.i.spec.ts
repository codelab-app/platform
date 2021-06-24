import { INestApplication } from '@nestjs/common';
import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { AppModule } from '../../app.module';
import { Auth0Service } from '@codelab/modules/auth-api';
import { createApp } from '../create-app/create-app.i.spec';
import { print } from 'graphql';
import { UpdateAppGql } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

describe('UpdateApp', () => {
  let nestApplication: INestApplication
  let accessToken = ''
  let app: any
  let updateVariables: any

  beforeAll(async () => {
    nestApplication = await setupTestModule(nestApplication, AppModule)

    const auth0Service = nestApplication.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
    app = await createApp(accessToken, nestApplication)
    updateVariables = {
      input: {
        id: app.id,
        data: {
          name: 'Test App Updated'
        }
      }
    }
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should not update app for a guest', async () => {
    await request(nestApplication.getHttpServer())
      .send({
        query: print(UpdateAppGql),
        variables: updateVariables,
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })
})
