import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  __AppFragment,
  CreateAppGql,
  CreateAppInput,
  CreateAppMutation,
  UpdateAppGql,
  UpdateAppInput,
  UpdateAppMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

describe('UpdateApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let app: __AppFragment
  let updateAppInput: UpdateAppInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })

    const results = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      createAppInput,
    )

    app = results.createApp
    updateAppInput = {
      id: app.id,
      data: {
        name: 'Test App Updated',
      },
    }

    expect(app.id).toBeDefined()
    expect(app).toMatchObject(createAppInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to update an app', async () => {
      await domainRequest(guestApp, UpdateAppGql, updateAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should update an app', async () => {
      const results = await domainRequest<UpdateAppInput, UpdateAppMutation>(
        userApp,
        UpdateAppGql,
        updateAppInput,
      )

      expect(results.app).toMatchObject({
        ...updateAppInput.data,
        id: updateAppInput.id,
      })
    })
  })
})
