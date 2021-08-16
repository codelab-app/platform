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
  let createdTagId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const { createTag } = await domainRequest<
      CreateTagInput,
      CreateTagMutation
    >(userApp, CreateTagGql, createTagInput)

    createdTagId = createTag.id
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get a Tag', async () => {
      await domainRequest<GetTagInput, GetTagQuery>(
        guestApp,
        GetTagGql,
        { where: { id: createdTagId } },
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tag by id', async () => {
      const { getTag } = await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        { where: { id: createdTagId } },
      )

      expect(getTag).toMatchObject(createTagInput)
    })

    it('should get Tag by name', async () => {
      const { getTag } = await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        { where: { name: createTagInput.name } },
      )

      expect(getTag).toMatchObject(createTagInput)
    })
  })
})
