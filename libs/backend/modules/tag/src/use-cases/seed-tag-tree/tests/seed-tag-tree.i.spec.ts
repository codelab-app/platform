import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
import {
  TestGetTagGraphGql,
  TestGetTagGraphQuery,
} from '../../get-tag-graph/tests/get-tag-graph.api.graphql.gen'
import { SeedTagTreeService } from '../seed-tag-tree.service'

describe('SeedTagTreeUseCase', () => {
  let app: INestApplication
  let seedTagTreeService: SeedTagTreeService

  beforeAll(async () => {
    app = await setupTestModule([TagModule], { role: Role.User })
    seedTagTreeService = app.get(SeedTagTreeService)
  })

  afterAll(async () => {
    await teardownTestModule(app)
  })

  it('should be truthy', () => {
    expect(true).toBeTruthy()
  })

  describe('User', () => {
    it('should seed a Tag Tree with a root Tag', async () => {
      await seedTagTreeService.execute({
        currentUser: { id: 'codelab-test-user-id', roles: [Role.User] },
      })

      const { getTagGraph: tagGraph } = await domainRequest<
        undefined,
        TestGetTagGraphQuery
      >(app, TestGetTagGraphGql)

      expect(tagGraph).toMatchObject({
        vertices: [{ name: SeedTagTreeService.__TAG_ROOT }],
        edges: [],
      })
    })
  })
})
