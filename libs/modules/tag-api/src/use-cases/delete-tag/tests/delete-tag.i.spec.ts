import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateTagGql,
  CreateTagInput,
  DeleteTagGql,
  DeleteTagInput,
  GetTagInput,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'

describe('DeleteTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let tagId: string
  let deleteTagInput: DeleteTagInput
  let getTagInput: GetTagInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const results = await domainRequest<CreateTagInput, CreateTagMutation>(
      userApp,
      CreateTagGql,
      createTagInput,
    )
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, DeleteTagGql, deleteTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createApp: { id: appId },
      } = await domainRequest<DeleteTagInput, DeleteTagMutation>(
        userApp,
        DeleteTagGql,
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
