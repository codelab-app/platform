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
  GetTagsGql,
  GetTagsQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { SeedTagTreeService } from '../../seed-tag-tree'

describe('GetTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  const tagA: CreateTagInput = {
    name: 'Tag A',
  }

  const tagB: CreateTagInput = {
    name: 'Tag B',
  }

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    await domainRequest<CreateTagInput, CreateTagMutation>(
      userApp,
      CreateTagGql,
      tagA,
    )
    await domainRequest<CreateTagInput, CreateTagMutation>(
      userApp,
      CreateTagGql,
      tagB,
    )
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest<unknown, GetTagsQuery>(
        guestApp,
        GetTagsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tags', async () => {
      const { getTags } = await domainRequest<unknown, GetTagsQuery>(
        userApp,
        GetTagsGql,
      )

      expect(getTags).toMatchObject([
        tagA,
        tagB,
        { name: SeedTagTreeService.__TAG_ROOT },
      ])
    })
  })
})
