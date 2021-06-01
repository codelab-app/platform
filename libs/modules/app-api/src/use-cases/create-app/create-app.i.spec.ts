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
import { AxiosRequestConfig } from 'axios'
import { print } from 'graphql'
import { AppModule } from '../../app.module'

const options: AxiosRequestConfig = {
  method: 'POST',
  url: new URL('oauth/token', process.env.AUTH0_ISSUER_BASE_URL).toString(),
  headers: { 'content-type': 'application/json' },
  data: `{"client_id":"${process.env.AUTH0_API_CLIENT_ID}","client_secret":"${process.env.AUTH0_API_CLIENT_SECRET}","audience":"${process.env.AUTH0_AUDIENCE}","grant_type":"client_credentials"}`,
}

describe('CreateApp', () => {
  let app: INestApplication
  const accessToken = ''

  beforeAll(async () => {
    app = await setupTestModule(app, AppModule)

    const auth0Service = app.get(Auth0Service)
    const auth0Client = auth0Service.getAuthClient()

    console.log(
      auth0Client.clientCredentialsGrant({
        audience: process.env.AUTH0_AUDIENCE!,
      }),
    )

    // await axios
    //   .request(options)
    //   .then((response) => {
    //     accessToken = response.data.access_token
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
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
