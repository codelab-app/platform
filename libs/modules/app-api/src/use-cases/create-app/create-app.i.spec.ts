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
import { INestApplication } from '@nestjs/common'
import axios, { AxiosRequestConfig } from 'axios'
import { print } from 'graphql'
import { AppModule } from '../../app.module'

const options: AxiosRequestConfig = {
  method: 'POST',
  url: 'https://codelab-ai.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: '{"client_id":"o5Gzovr6PG6mP00tONJxbCvmc6ZfRonT","client_secret":"QyhCFJ7BHzMBe-XDiy3yr4tud5Ox52SqjYmoKjVk2ET6ISyaaJPNLpDCgvs9l3lQ","audience":"https://api.codelab.ai","grant_type":"client_credentials"}',
}

describe('CreateApp', () => {
  let app: INestApplication
  let accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, AppModule)

    await axios
      .request(options)
      .then((response) => {
        accessToken = response.data.access_token
      })
      .catch((error) => {
        console.error(error)
      })
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
