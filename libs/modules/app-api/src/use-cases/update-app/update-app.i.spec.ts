import {
  ApiResponse,
  request,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AppFragment,
  UpdateAppGql,
  UpdateAppMutationResult,
  UpdateAppMutationVariables,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { print } from 'graphql'
import { AppModule } from '../../app.module'
import { createApp } from '../../helpers/create-app'

describe('UpdateApp', () => {
  let userApp: INestApplication
  let guestApp: INestApplication
  let app: __AppFragment
  let updateVariables: UpdateAppMutationVariables

  beforeAll(async () => {
    userApp = await setupTestModule([AppModule], { role: Role.USER })
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    app = await createApp(userApp)

    updateVariables = {
      input: {
        id: app.id,
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
    it('should fail to update an app', async () => {
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
    it('should update an app', async () => {
      await request(userApp.getHttpServer())
        .send({
          query: print(UpdateAppGql),
          variables: updateVariables,
        })
        .expect(200)
        .expect((res: ApiResponse<UpdateAppMutationResult>) => {
          expect(res.body.data?.app).toMatchObject({
            id: app.id,
            name: updateVariables.input.data.name,
          })
        })
    })
  })
})
