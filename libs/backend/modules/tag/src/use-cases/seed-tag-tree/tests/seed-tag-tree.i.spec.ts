import {
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'

describe.skip('SeedTagTreeUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })

  // describe('Guest', () => {
  //   it('should fail to create a Tag', async () => {
  //     await domainRequest(guestApp, SeedTagTreeGql, createAppInput, {
  //       message: 'Unauthorized',
  //     })
  //   })
  // })

  // describe('User', () => {
  //   it('should create an App', async () => {
  //     const {
  //       createApp: { id: appId },
  //     } = await domainRequest<SeedTagTreeInput, SeedTagTreeMutation>(
  //       userApp,
  //       SeedTagTreeGql,
  //       createAppInput,
  //     )
  //
  //     expect(appId).toBeDefined()
  //
  //     const { getApp: app } = await domainRequest<GetAppInput, GetAppQuery>(
  //       userApp,
  //       GetAppGql,
  //       { byId: { appId } },
  //     )
  //
  //     expect(app).toMatchObject({ ...createAppInput, id: appId })
  //   })
  // })
})
