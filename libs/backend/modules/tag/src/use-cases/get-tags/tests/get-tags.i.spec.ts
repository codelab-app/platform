import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { createTags, tagAData, tagBData } from '../../create-tag'
import { TestGetTagsGql, TestGetTagsQuery } from './get-tags.api.graphql.gen'

describe('GetTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })

    await createTags(userApp)
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest<unknown, TestGetTagsQuery>(
        guestApp,
        TestGetTagsGql,
        {},
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get Tags', async () => {
      const { getTags } = await domainRequest<unknown, TestGetTagsQuery>(
        userApp,
        TestGetTagsGql,
      )

      expect(getTags).toMatchObject([tagAData, tagBData])
    })
  })
})
