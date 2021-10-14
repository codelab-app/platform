import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import { childTagData, createTagGraphs, parentTagData } from '../../create-tag'
import { GetTagGraphsInput } from '../get-tag-graphs.input'
import {
  TestGetTagGraphsGql,
  TestGetTagGraphsQuery,
} from './get-tag-graphs.api.graphql.gen'

describe('GetTagGraphsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication
  let parentTagId = ''
  let childTagId = ''

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })
    adminApp = await setupTestModule([TagModule], { role: Role.Admin })

    const { parentTag, childTag } = await createTagGraphs(userApp)

    parentTagId = parentTag.id
    childTagId = childTag.id
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(guestApp, TestGetTagGraphsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get tag graphs', async () => {
      const { getTagGraphs } = await domainRequest<
        GetTagGraphsInput,
        TestGetTagGraphsQuery
      >(userApp, TestGetTagGraphsGql)

      expect(getTagGraphs).toMatchObject({
        vertices: [parentTagData, childTagData],
        edges: [
          {
            source: parentTagId,
            target: childTagId,
          },
        ],
      })
    })
  })
})
