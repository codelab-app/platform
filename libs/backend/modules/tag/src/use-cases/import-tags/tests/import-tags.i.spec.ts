import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../../../tag.module'
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
import { tagGraphsData } from './import-tags.data'

describe('ImportTagsUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let adminApp: INestApplication

  beforeAll(async () => {
    guestApp = await setupTestModule([TagModule], { role: Role.Guest })
    userApp = await setupTestModule([TagModule], { role: Role.User })
    adminApp = await setupTestModule([TagModule], { role: Role.Admin })
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
    await teardownTestModule(adminApp)
  })

  // describe('Guest', () => {
  //   it('should fail to import tags', async () => {
  //     await domainRequest(
  //       guestApp,
  //       TestImportTagsGql,
  //       {},
  //       {
  //         message: 'Unauthorized',
  //       },
  //     )
  //   })
  // })

  describe('User', () => {
    it('should import tags', async () => {
      await domainRequest<ImportTagsInput, TestImportTagsMutation>(
        userApp,
        TestImportTagsGql,
        {
          payload: JSON.stringify(tagGraphsData),
        },
      )

      const { getTagGraphs } = await domainRequest<
        GetTagGraphsInput,
        TestGetTagGraphsQuery
      >(userApp, TestGetTagGraphsGql)

      expect(getTagGraphs).toMatchObject(tagGraphsData)
    })
  })
})
