import { ApolloQueryResult } from '@apollo/client'
import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { DeleteAppGql, DeleteAppMutationResult } from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { createApp } from '../../helpers/create-app'

describe('DeleteApp', () => {
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
    it('should fail to delete an app', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(DeleteAppGql),
          variables: {
            input: { appId },
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
            input: { appId },
          },
        })
        .expect(200)
        .expect((res: ApiResponse<DeleteAppMutationResult>) => {
          // graphql scalar Void == null
          expect(res.body.data?.deleteApp).toBeNull()
        })
    })
  })
})
