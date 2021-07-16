import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  GetAppGql,
  GetAppQuery,
  GetAppQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { createApp } from '../../helpers'

describe('GetApp', () => {
  let userApp: INestApplication
  let guestApp: INestApplication
  let appId: string

  beforeAll(async () => {
    userApp = await setupTestModule([AppModule], { role: Role.USER })
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    appId = await createApp(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(userApp)
    await teardownTestModule(guestApp)
  })

  describe('Guest', () => {
    it('should not get an app', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetAppGql),
          variables: {
            input: { byId: { appId: appId as string } },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should get an app for', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(GetAppGql),
          variables: {
            input: { byId: { appId: appId as string } },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<GetAppQueryResult>) => {
          const responseApp = (res.body.data as GetAppQuery)?.getApp

          expect(responseApp).toMatchObject({
            id: appId,
            name: 'Test App',
          })
        })
    })
  })
})
