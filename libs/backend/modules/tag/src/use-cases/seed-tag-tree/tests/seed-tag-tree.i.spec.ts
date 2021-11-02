import { testAuth0Id, testUserUid } from '@codelab/backend/shared/generic'
import { domainRequest } from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import {
  TestGetTagGraphGql,
  TestGetTagGraphQuery,
} from '../../get-tag-graph/tests/get-tag-graph.api.graphql.gen'
import { SeedTagTreeService } from '../seed-tag-tree.service'

describe.skip('SeedTagTreeUseCase', () => {
  const testModule = setupTagTestModule()
  let seedTagTreeService: SeedTagTreeService

  beforeAll(async () => {
    seedTagTreeService = testModule.userApp.get(SeedTagTreeService)
  })

  describe('User', () => {
    it('should seed a Tag Tree with a root Tag', async () => {
      await seedTagTreeService.execute({
        currentUser: {
          id: testUserUid,
          auth0Id: testAuth0Id,
          roles: [Role.User],
        },
      })

      const { getTagGraph: tagGraph } = await domainRequest<
        undefined,
        TestGetTagGraphQuery
      >(testModule.userApp, TestGetTagGraphGql)

      expect(tagGraph).toMatchObject({
        vertices: [{ name: SeedTagTreeService.__TAG_ROOT }],
        edges: [],
      })
    })
  })
})
