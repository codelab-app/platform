import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  UpdateAppGql,
  UpdateAppMutationResult,
  UpdateAppMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { getApp } from '../../helpers'
import { createApp } from '../../helpers/create-app'

describe('UpdateApp', () => {
  let userApp: INestApplication
  let guestApp: INestApplication
  let appId: string
  let updateVariables: UpdateAppMutationVariables

  beforeAll(async () => {
    userApp = await setupTestModule([AppModule], { role: Role.USER })
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    appId = await createApp(userApp)

    updateVariables = {
      input: {
        id: appId,
        data: {
          name: 'Test App Updated',
        },
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(userApp)
    await teardownTestModule(guestApp)
  })

  describe('Guest', () => {
    it('should fail to update an appId', async () => {
      await request(guestApp.getHttpServer())
        .send({
          query: print(UpdateAppGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<any>) => {
          expect(res?.body?.errors).toMatchObject([{ message: 'Unauthorized' }])
        })
    })
  })

  describe('User', () => {
    it('should update an appId', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(UpdateAppGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect(async (res: ApiResponse<UpdateAppMutationResult>) => {
          expect(res.body.data?.app).toBeNull()

          const app = await getApp(userApp, {
            byId: { appId: appId as string },
          })

          expect(app).toMatchObject({
            id: appId,
            name: updateVariables.input.data.name,
          })
        })
    })
  })
})
