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
  DeleteTagGql,
  DeleteTagInput,
  DeleteTagMutation,
  GetTagGql,
  GetTagInput,
  GetTagQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../..'
import { createTagInput } from '../../create-tag/tests/create-tag.data'

describe('DeleteTagUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let tagId: string
  let deleteTagInput: DeleteTagInput
  let getTagInput: GetTagInput

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.GUEST })
    userApp = await setupTestModule([TagModule], { role: Role.USER })

    const {
      createTag: { id },
    } = await domainRequest<CreateTagInput, CreateTagMutation>(
      userApp,
      CreateTagGql,
      createTagInput,
    )

    deleteTagInput = {
      id,
    }
    getTagInput = {
      id,
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to delete a Tag', async () => {
      await domainRequest<DeleteTagInput, DeleteTagMutation>(
        guestApp,
        DeleteTagGql,
        deleteTagInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete a Tag', async () => {
      await domainRequest<DeleteTagInput, DeleteTagMutation>(
        userApp,
        DeleteTagGql,
        deleteTagInput,
      )

      await domainRequest<GetTagInput, GetTagQuery>(
        userApp,
        GetTagGql,
        getTagInput,
        { message: 'Not found' },
      )
    })
  })
})
