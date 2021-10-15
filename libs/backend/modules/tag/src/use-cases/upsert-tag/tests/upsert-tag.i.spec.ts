import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { TestUpsertTagGql } from './upsert-tag.api.graphql.gen'

describe.skip('UpsertTagUseCase', () => {
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
    await teardownTestModule(adminApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(
        guestApp,
        TestUpsertTagGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  // describe('User', () => {
  //   it('should create an App', async () => {
  //     const {
  //       createApp: { id: appId },
  //     } = await domainRequest<UpsertTagInput, UpsertTagMutation>(
  //       userApp,
  //       UpsertTagGql,
  //       createAppInput,
  //     )

  //     expect(appId).toBeDefined()

  //     const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
  //       userApp,
  //       GetAppGql,
  //       { byId: { appId } },
  //     )

  //     expect(app).toMatchObject({ ...createAppInput, id: appId })
  //   })
  // })
})
