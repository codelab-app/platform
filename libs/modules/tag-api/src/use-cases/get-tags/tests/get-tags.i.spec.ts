import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import { GetTagInput, GetTagsGql } from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'

describe('GetTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getTagsInput: GetTagInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, GetTagsGql, getTagsInput, {
        message: 'Unauthorized',
      })
    })
  })

  // describe('User', () => {
  //   it('should create an App', async () => {
  //     const {
  //       createApp: { id: appId },
  //     } = await domainRequest<GetTagsInput, GetTagsMutation>(
  //       userApp,
  //       GetTagsGql,
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
