import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend'
import {
  CreateTagGql,
  CreateTagInput,
  CreateTagMutation,
  GetTagInput,
  GetTagsGql,
  GetTagsQuery,
} from '@codelab/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'

describe('GetTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let getTagsInput: GetTagInput

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

      console.log(getTags)

      expect(getTags).toMatchObject([tagA, tagB])
    })
  })
})
