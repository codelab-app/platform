import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql.gen'
import { createTagInput } from '../../create-tag/tests/create-tag.data'
import { GetTagInput } from '../../get-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../../get-tag/tests/get-tag.api.graphql.gen'

describe('GetTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getTagInput: GetTagInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    const {
      createTag: { id: tagId },
    } = await domainRequest<CreateTagInput, TestCreateTagMutation>(
      userApp,
      TestCreateTagGql,
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
      await domainRequest(guestApp, TestGetTagGql, getTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a Tag', async () => {
      const { getTag: tag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        userApp,
        TestGetTagGql,
        getTagInput,
      )

      expect(tag).toMatchObject({ ...createTagInput, id: getTagInput.where.id })
    })
  })
})
