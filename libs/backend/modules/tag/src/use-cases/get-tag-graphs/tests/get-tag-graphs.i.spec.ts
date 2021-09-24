import {
  domainRequest,
  // Role,
  // setupTestModule,
  // teardownTestModule,
} from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'

describe('GetTagGraphsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })
    adminApp = await setupTestModule([TagModule], { role: Role.Admin })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, GetTagGraphsGql, createAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createApp: { id: appId },
      } = await domainRequest<GetTagGraphsInput, GetTagGraphsMutation>(
        userApp,
        GetTagGraphsGql,
        createAppInput,
      )

      expect(appId).toBeDefined()

      const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
        userApp,
        GetAppGql,
        { byId: { appId } },
      )

      expect(app).toMatchObject({ ...createAppInput, id: appId })
    })
  })
})
