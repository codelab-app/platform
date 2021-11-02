// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { GetUserInput } from '../use-cases/get-user'
import {
  TestGetUserGql,
  TestGetUserQuery,
} from '../use-cases/get-user/tests/test-get-user.api.graphql.gen'
import {
  TestUpsertUserGql,
  TestUpsertUserMutation,
} from '../use-cases/upsert-user/tests/test-upsert-user.api.graphql.gen'
import { UpsertUserInput } from '../use-cases/upsert-user/upsert-user.input'
import { UserModule } from '../user.module'

export const setupUserTestModule = () => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    upsertUser: (input: UpsertUserInput) => {
      return domainRequest<UpsertUserInput, TestUpsertUserMutation>(
        testModule.userApp,
        TestUpsertUserGql,
        input,
      ).then((r) => r?.upsertUser)
    },
    getUser: (input: GetUserInput) => {
      return domainRequest<GetUserInput, TestGetUserQuery>(
        testModule.userApp,
        TestGetUserGql,
        input,
      ).then((r) => r?.getUser)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([UserModule], {
      role: Role.Guest,
      resetDb: true,
    })
    testModule.userApp = await setupTestModule([UserModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
