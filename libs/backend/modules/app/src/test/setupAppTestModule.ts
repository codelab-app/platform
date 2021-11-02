import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../app.module'
import { CreateAppInput } from '../use-cases/create-app'
import {
  TestCreateAppGql,
  TestCreateAppMutation,
} from '../use-cases/create-app/tests/create-app.api.graphql.gen'
import { GetAppInput } from '../use-cases/get-app'
import {
  TestGetAppGql,
  TestGetAppQuery,
} from '../use-cases/get-app/tests/get-app.api.graphql.gen'

export const setupAppTestModule = (resetDb = true) => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    createTestApp: (input: CreateAppInput) => {
      return domainRequest<CreateAppInput, TestCreateAppMutation>(
        testModule.userApp,
        TestCreateAppGql,
        input,
      ).then((r) => r.createApp)
    },
    getApp: (input: GetAppInput) => {
      return domainRequest<GetAppInput, TestGetAppQuery>(
        testModule.userApp,
        TestGetAppGql,
        input,
      ).then((r) => r.getApp)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([AppModule], {
      role: Role.Guest,
      resetDb,
    })
    testModule.userApp = await setupTestModule([AppModule], { role: Role.User })
  })

  afterAll(async () => {
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
