import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TagModule } from '../tag.module'
import { CreateTagInput } from '../use-cases/create-tag'
import {
  TestCreateTagGql,
  TestCreateTagMutation,
} from '../use-cases/create-tag/tests/create-tag.api.graphql.gen'
import { GetTagInput } from '../use-cases/get-tag'
import {
  TestGetTagGql,
  TestGetTagQuery,
} from '../use-cases/get-tag/tests/get-tag.api.graphql.gen'

export const setupTagTestModule = () => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    adminApp: null! as INestApplication,
    createTag: (input: CreateTagInput) => {
      return domainRequest<CreateTagInput, TestCreateTagMutation>(
        testModule.userApp,
        TestCreateTagGql,
        input,
      ).then((r) => r.createTag)
    },
    getTag: (input: GetTagInput) => {
      return domainRequest<GetTagInput, TestGetTagQuery>(
        testModule.userApp,
        TestGetTagGql,
        input,
      ).then((r) => r.getTag)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([TagModule], {
      role: Role.Guest,
      resetDb: true,
    })
    testModule.userApp = await setupTestModule([TagModule], { role: Role.User })
    testModule.adminApp = await setupTestModule([TagModule], {
      role: Role.Admin,
    })
  })

  afterAll(async () => {
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
    await teardownTestModule(testModule.adminApp)
  })

  return testModule
}
