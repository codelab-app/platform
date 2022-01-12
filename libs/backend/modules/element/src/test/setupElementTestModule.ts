import { AtomModule } from '@codelab/backend/modules/atom'
import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../element.module'
import { CreateComponentInput } from '../use-cases/component/create-component/create-component.input'
import {
  TestCreateComponentGql,
  TestCreateComponentMutation,
} from '../use-cases/component/create-component/tests/create-component.api.graphql.gen'
import { CreateElementInput } from '../use-cases/element/create-element/create-element.input'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../use-cases/element/create-element/tests/create-element.api.graphql.gen'
import { GetElementInput } from '../use-cases/element/get-element/get-element.input'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../use-cases/element/get-element/tests/get-element.api.graphql.gen'
import {
  GetElementGraphInput,
  TestGetElementGraphGql,
  TestGetElementGraphQuery,
} from '../use-cases/element/get-element-graph'

/**
 * Sets up apps and helper methods needed for integration tests of the Element module
 * @param resetDb Whether to reset the database before all tests
 */
export const setupElementTestModule = () => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    adminApp: null! as INestApplication,
    createTestElement: (input: CreateElementInput) => {
      return domainRequest<CreateElementInput, TestCreateElementMutation>(
        testModule.userApp,
        TestCreateElementGql,
        input,
      ).then((r) => r.createElement)
    },
    getElement: (input: GetElementInput) => {
      return domainRequest<GetElementInput, TestGetElementQuery>(
        testModule.userApp,
        TestGetElementGql,
        input,
      ).then((r) => r.getElement)
    },
    getElementGraph: (input: GetElementInput) => {
      return domainRequest<GetElementGraphInput, TestGetElementGraphQuery>(
        testModule.userApp,
        TestGetElementGraphGql,
        input,
      ).then((r) => r.getElementGraph)
    },
    createComponent: (input: CreateComponentInput) => {
      return domainRequest<CreateComponentInput, TestCreateComponentMutation>(
        testModule.userApp,
        TestCreateComponentGql,
        input,
      ).then((r) => r.createComponent)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([ElementModule], {
      role: Role.Guest,
      resetDb: true,
    })
    testModule.userApp = await setupTestModule([ElementModule], {
      role: Role.User,
    })
    testModule.adminApp = await setupTestModule([AtomModule], {
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
