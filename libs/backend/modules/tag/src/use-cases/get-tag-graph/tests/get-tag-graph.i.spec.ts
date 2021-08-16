import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateTagGql,
  CreateTagInput,
  CreateTagMutation,
  GetTagGql,
  GetTagInput,
  GetTagQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { createTagInput } from '../../create-tag/tests/create-tag.data'

describe('GetTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getTagInput: GetTagInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const {
      createTag: { id: tagId },
    } = await domainRequest<CreateTagInput, CreateTagMutation>(
      userApp,
      CreateTagGql,
      createTagInput,
    )

    getTagInput = {
      where: {
        id: tagId,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a Tag', async () => {
      await domainRequest(guestApp, GetTagGql, getTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a Tag', async () => {
      const { getTag: tag } = await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        getTagInput,
      )

      expect(tag).toMatchObject({ ...createTagInput, id: getTagInput.where.id })
    })
  })
})
