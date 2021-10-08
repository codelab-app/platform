import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { GetTagGraphsInput } from '../../get-tag-graphs'
import {
  TestGetTagGraphsGql,
  TestGetTagGraphsQuery,
} from '../../get-tag-graphs/tests/get-tag-graphs.api.graphql.gen'
import { ImportTagsInput } from '../import-tags.input'
import {
  TestImportTagsGql,
  TestImportTagsMutation,
} from './import-tags.api.graphql.gen'
import { tagGraphData } from './import-tags.data'

describe('ImportTagsUseCase', () => {
  const testModule = setupTagTestModule()

  describe('User', () => {
    it('should import tags', async () => {
      await domainRequest<ImportTagsInput, TestImportTagsMutation>(
        testModule.userApp,
        TestImportTagsGql,
        {
          payload: JSON.stringify(tagGraphData),
        },
      )

      const { getTagGraphs } = await domainRequest<
        GetTagGraphsInput,
        TestGetTagGraphsQuery
      >(testModule.userApp, TestGetTagGraphsGql)

      // Remove id's for now
      expect(getTagGraphs.edges).toMatchObject(
        tagGraphData.edges.map(({ source, target, ...e }) => ({
          ...e,
          source: expect.anything(),
          target: expect.anything(),
        })),
      )
      expect(getTagGraphs.vertices).toMatchObject(
        tagGraphData.vertices.map(({ id, ...v }) => v),
      )
    })
  })
})
