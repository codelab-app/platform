import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { CreateTagInput } from '../../create-tag/create-tag.input'
import {
  CreateTagGql,
  CreateTagMutation,
} from '../../create-tag/tests/create-tag.api.graphql'
import { SeedTagTreeService } from '../../seed-tag-tree'
import { GetTagsGql, GetTagsQuery } from './get-tags.api.graphql'

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
        { name: SeedTagTreeService.__TAG_ROOT },
        tagA,
        tagB,
      ])
    })
  })
})
