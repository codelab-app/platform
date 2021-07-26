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
  DeleteAppGql,
  DeleteAppMutationResult,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { createApp } from '../../helpers/create-app'

describe('DeleteApp', () => {
  let userApp: INestApplication
  let guestApp: INestApplication
  let app: __AppFragment

  beforeAll(async () => {
    userApp = await setupTestModule([AppModule], { role: Role.USER })
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    app = await createApp(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(userApp)
    await teardownTestModule(guestApp)
  })

  describe('Guest', () => {
    it('should fail to delete an app', async () => {
      await request(guestApp.getHttpServer())
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
  })

  describe('User', () => {
    it('should delete an app', async () => {
      await request(userApp.getHttpServer())
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
          expect(res.body.data?.deleteApp).toMatchObject({
            id: app.id,
          })
        })
    })
  })
})
