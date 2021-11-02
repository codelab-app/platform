import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { childTagData, createTagGraphs, parentTagData } from '../../create-tag'
import { GetTagGraphsInput } from '../get-tag-graphs.input'
import {
  TestGetTagGraphsGql,
  TestGetTagGraphsQuery,
} from './get-tag-graphs.api.graphql.gen'

describe('GetTagGraphsUseCase', () => {
  const testModule = setupTagTestModule()
  let parentTagId = ''
  let childTagId = ''

  beforeAll(async () => {
    const { parentTag, childTag } = await createTagGraphs(testModule.userApp)

    parentTagId = parentTag.id
    childTagId = childTag.id
  })

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(testModule.guestApp, TestGetTagGraphsGql, undefined, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get tag graphs', async () => {
      const { getTagGraphs } = await domainRequest<
        GetTagGraphsInput,
        TestGetTagGraphsQuery
      >(testModule.userApp, TestGetTagGraphsGql)

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
