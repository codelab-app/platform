import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { GetTagInput } from '../../get-tag/get-tag.input'
import { GetTagGql, GetTagQuery } from '../../get-tag/tests/get-tag.api.graphql'
import { CreateTagInput } from '../create-tag.input'
import { CreateTagGql, CreateTagMutation } from './create-tag.api.graphql'
import { createTagInput } from './create-tag.data'

describe('CreateTagUseCase', () => {
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

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, CreateTagGql, createTagInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const {
        createTag: { id: tagId },
      } = await domainRequest<CreateTagInput, CreateTagMutation>(
        userApp,
        CreateTagGql,
        createTagInput,
      )

      expect(tagId).toBeDefined()

      const { getTag: tag } = await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        { where: { id: tagId } },
      )

      expect(tag).toMatchObject({ ...createTagInput, id: tagId })
    })
  })
})
