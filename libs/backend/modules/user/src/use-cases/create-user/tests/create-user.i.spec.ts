import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { UserModule } from '../../../../framework/nestjs/UserModule'

describe('CreateUserUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([UserModule], { role: Role.GUEST })
    userApp = await setupTestModule([UserModule], { role: Role.USER })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a User', async () => {
      await domainRequest(guestApp, CreateUserGql, createAppInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createApp: { id: appId },
      } = await domainRequest<CreateUserInput, CreateUserMutation>(
        userApp,
        CreateUserGql,
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
