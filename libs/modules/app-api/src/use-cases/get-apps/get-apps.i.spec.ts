import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AppFragment,
  GetAppsGql,
  GetAppsQueryResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { createApp } from '../../helpers/create-app'

describe('GetApps', () => {
  let userApp: INestApplication
  let guestApp: INestApplication
  let app: __AppFragment

  beforeAll(async () => {
    userApp = await setupTestModule([AppModule], {
      role: Role.USER,
      resetDb: true,
    })
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    app = await createApp(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(userApp)
    await teardownTestModule(guestApp)
  })

  describe('Guest', () => {
    it('should not get apps', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(GetAppsGql),
        })
        .expect(200)
        .expect((res: ApiResponse<ApolloQueryResult<any>>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should get apps', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(GetAppsGql),
        })
        .expect(200)
        .expect((res: ApiResponse<GetAppsQueryResult>) => {
          expect(res.body.data?.apps).toMatchObject([
            {
              id: app.id,
              name: 'Test App',
            },
          ])
        })
    })
  })
})
