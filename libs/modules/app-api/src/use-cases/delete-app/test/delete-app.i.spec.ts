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
  DeleteAppGql,
  DeleteAppInput,
  DeleteAppMutation,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

describe('DeleteApp', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let app: __AppFragment
  let deleteAppInput: DeleteAppInput

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })

    const results = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      createAppInput,
    )

    app = results.createApp
    deleteAppInput = {
      appId: app.id,
    }

    expect(app.id).toBeDefined()
    expect(app).toMatchObject(createAppInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete an app', async () => {
      await domainRequest(guestApp, DeleteAppGql, deleteAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should delete an app', async () => {
      const results = await domainRequest<DeleteAppInput, DeleteAppMutation>(
        userApp,
        DeleteAppGql,
        deleteAppInput,
      )

      expect(results.deleteApp).toMatchObject({
        id: app.id,
      })
    })
  })
})
