import { ApiResponse, request, setupTestModule, teardownTestModule } from '@codelab/backend';
import { Auth0Service } from '@codelab/modules/auth-api';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { print } from 'graphql';
import { CreateAppGql, CreateAppMutation, CreateAppMutationVariables } from '@codelab/codegen/graphql';
import { ApolloQueryResult } from '@apollo/client';

export const createApp = async (accessToken: string,
                                 app: INestApplication,) => {
  const variables: CreateAppMutationVariables = {
    input: {
      name: 'Test App'
    }
  }

  const r = await request(app.getHttpServer())
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      query: print(CreateAppGql),
      variables,
    })
    .expect(200)
    .then((res) => (res.body.data as CreateAppMutation)?.createApp)

  return r
}

describe('CreateApp', () => {
  let app: INestApplication
  let accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, AppModule)

    const auth0Service = app.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should fail to create app for guest', async () => {
    const variables: CreateAppMutationVariables = {
      input: {
        name: 'Test App'
      }
    }

    await request(app.getHttpServer())
      .send({
        query: print(CreateAppGql),
        variables
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should create app', async () => {
    const result: any = await createApp(accessToken, app)
    expect(result.name).toEqual('Test App')
  })
})
