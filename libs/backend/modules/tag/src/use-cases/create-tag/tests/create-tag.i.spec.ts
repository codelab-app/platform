import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { GetTagInput } from '../../get-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../../get-tag/tests/get-tag.api.graphql.gen'
import { CreateTagInput } from '../create-tag.input'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from './create-tag.api.graphql.gen'
import { createTagInput } from './create-tag.data'

describe('CreateTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, TestCreateTagGql, createTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createTag: { id: tagId },
      } = await domainRequest<CreateTagInput, TestCreateTagMutation>(
        userApp,
        TestCreateTagGql,
        createTagInput,
      )

      expect(tagId).toBeDefined()

      const { getTag: tag } = await domainRequest<GetTagInput, TestGetTagQuery>(
        userApp,
        TestGetTagGql,
        { where: { id: tagId } },
      )

      expect(tag).toMatchObject({ ...createTagInput, id: tagId })
    })
  })
})
