import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  Auth0Service,
  request,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AppFragment,
  CreateAppGql,
  CreateAppMutationResult,
  CreateAppMutationVariables,
  DeleteAppGql,
  DeleteAppMutationResult,
  GetAppGql,
  GetAppQueryResult,
  GetAppQueryVariables,
  GetAppsGql,
  GetAppsQueryResult,
  UpdateAppGql,
  UpdateAppMutationResult,
  UpdateAppMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from './app.module'

describe('AppModule', () => {
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

  let createdApp: __AppFragment

  describe('CreateApp', () => {
    const createVariables: CreateAppMutationVariables = {
      input: {
        name: 'Codelab',
      },
    }

    it('should fail to create an app for a guest', async () => {
      await request(app.getHttpServer())
        .send({
          query: print(CreateAppGql),
          variables: createVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })

    it('should create an app for an authorized user', async () => {
      createdApp = await request(app.getHttpServer())
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
        })
        .then((res) => res.body.data?.createApp)
    })
  })

  describe('UpdateApp', () => {
    let updateVariables: UpdateAppMutationVariables | undefined

    it('should not update an app for a guest', async () => {
      // Doesn't work inside "describe" block
      updateVariables = {
        input: {
          id: createdApp.id,
          data: {
            name: 'Codelab V2',
          },
        },
      }

      await request(app.getHttpServer())
        .send({
          query: print(UpdateAppGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })

    it('should update an app for an authorized user', async () => {
      await request(app.getHttpServer())
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          query: print(UpdateAppGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<UpdateAppMutationResult>) => {
          expect(res.body.data?.app).toMatchObject({
            id: createdApp.id,
            name: 'Codelab V2',
          })
        })
    })
  })

  describe('GetApp', () => {
    let getVariables: GetAppQueryVariables

    it('should not get an app for a guest', async () => {
      getVariables = {
        input: {
          appId: createdApp.id,
        },
      }

      await request(app.getHttpServer())
        .send({
          query: print(GetAppGql),
          variables: getVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })

    it('should get an app for an authorized user', async () => {
      await request(app.getHttpServer())
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          query: print(GetAppGql),
          variables: getVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<GetAppQueryResult>) => {
          expect(res.body.data?.app).toMatchObject({
            id: createdApp.id,
            name: 'Codelab V2',
          })
        })
    })
  })

  describe('GetApps', () => {
    it('should not get apps for a guest', async () => {
      await request(app.getHttpServer())
        .send({
          query: print(GetAppsGql),
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })

    it('should get an app for an authorized user', async () => {
      await request(app.getHttpServer())
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          query: print(GetAppsGql),
        })
        .expect(200)
        .expect((res: ApiResponse<GetAppsQueryResult>) => {
          expect(res.body.data?.apps).toMatchObject([
            {
              id: createdApp.id,
              name: 'Codelab V2',
            },
          ])
        })
    })
  })

  describe('Delete', () => {
    it('should fail to delete an app for a guest', async () => {
      await request(app.getHttpServer())
        .send({
          query: print(DeleteAppGql),
          variables: {
            input: {
              appId: createdApp.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })

    it('should delete an app for an authorized user', async () => {
      await request(app.getHttpServer())
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          query: print(DeleteAppGql),
          variables: {
            input: {
              appId: createdApp.id,
            },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<DeleteAppMutationResult>) => {
          expect(res.body.data?.deleteApp).toMatchObject({
            id: createdApp.id,
          })
        })
    })
  })
})
