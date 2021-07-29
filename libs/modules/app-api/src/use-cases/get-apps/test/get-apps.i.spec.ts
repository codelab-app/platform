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
  GetAppsGql,
  GetAppsQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../../app.module'
import { createAppInput } from '../../create-app/test/create-app.data'

describe('GetApps', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let app: __AppFragment

  beforeAll(async () => {
    guestApp = await setupTestModule([AppModule], { role: Role.GUEST })
    userApp = await setupTestModule([AppModule], { role: Role.USER })

    const results = await domainRequest<CreateAppInput, CreateAppMutation>(
      userApp,
      CreateAppGql,
      createAppInput,
    )

    app = results.createApp

    expect(app.id).toBeDefined()
    expect(app).toMatchObject(createAppInput)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get apps', async () => {
      await domainRequest(guestApp, GetAppsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get apps', async () => {
      const results = await domainRequest<any, GetAppsQuery>(
        userApp,
        GetAppsGql,
      )

      expect(results?.apps).toMatchObject([app])
    })
  })
})
