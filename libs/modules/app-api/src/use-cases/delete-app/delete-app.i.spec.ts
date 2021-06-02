import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateAppGql,
  CreateAppMutationResult,
  CreateAppMutationVariables,
} from '@codelab/graphql'
import { Auth0Service } from '@codelab/modules/auth-api'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'

const createVariables: CreateAppMutationVariables = {
  input: {
    name: 'Codelab',
  },
}

describe('DeleteApp', () => {
  let app: INestApplication
  let accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, AppModule)

    const auth0Service = app.get(Auth0Service)
    accessToken = await auth0Service.getAccessToken()

    const createdApp = await request(app.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables: createVariables,
      })
      .expect(200)
      .expect((res: ApiResponse<CreateAppMutationResult>) => {
        expect(res.body.data?.createApp).toMatchObject({
          name: 'Codelab',
        })

        return res.body.data?.createApp
      })

    console.log(createdApp)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  const variables: CreateAppMutationVariables = {
    input: {
      name: 'Codelab',
    },
  }

  it('should fail to create an app for a guest', async () => {
    await request(app.getHttpServer())
      .send({
        query: print(CreateAppGql),
        variables,
      })
      .expect(200)
      .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
        expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
      })
  })

  it('should create an app for an authorized user', async () => {
    await request(app.getHttpServer())
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        query: print(CreateAppGql),
        variables,
      })
      .expect(200)
      .expect((res: ApiResponse<CreateAppMutationResult>) => {
        expect(res.body.data?.createApp).toMatchObject({
          name: 'Codelab',
        })
      })
  })
})
