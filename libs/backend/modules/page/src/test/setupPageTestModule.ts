import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { PageModule } from '../page.module'
import { CreatePageInput } from '../use-cases/create-page'
import {
  TestCreatePageGql,
  TestCreatePageMutation,
} from '../use-cases/create-page/tests/create-page.api.graphql.gen'
import { GetPageInput } from '../use-cases/get-page/get-page.input'
import {
  TestGetPageGql,
  TestGetPageQuery,
} from '../use-cases/get-page/tests/get-page.api.graphql.gen'

export const setupPageTestModule = () => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    createTestApp: (input: { name: string }) => {
      const dgraph = testModule.userApp.get<DgraphRepository>(DgraphRepository)
      const blankNodeLabel = 'app'

      // Manual mutation is needed to avoid circular dependency to app module
      const mutation = {
        uid: `_:${blankNodeLabel}`,
        name: input.name,
        'dgraph.type': [DgraphEntityType.App],
      }

      return dgraph.transactionWrapper((txn) =>
        dgraph.create(txn, { setJson: mutation }, blankNodeLabel),
      )
    },
    createTestPage: (input: CreatePageInput) => {
      return domainRequest<CreatePageInput, TestCreatePageMutation>(
        testModule.userApp,
        TestCreatePageGql,
        input,
      ).then((r) => r.createPage)
    },
    getPage: (input: GetPageInput) => {
      return domainRequest<GetPageInput, TestGetPageQuery>(
        testModule.userApp,
        TestGetPageGql,
        input,
      ).then((r) => r.page)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([PageModule], {
      role: Role.Guest,
      resetDb: true,
    })
    testModule.userApp = await setupTestModule([PageModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
