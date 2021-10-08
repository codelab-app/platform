import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { TypeModule } from '../type.module'
import { CreateFieldInput } from '../use-cases/field/create-field'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from '../use-cases/field/create-field/tests/create-field.api.graphql.gen'
import { CreateTypeInput } from '../use-cases/type/create-type/inputs/create-type.input'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../use-cases/type/create-type/tests/create-type.api.graphql.gen'
import { GetTypeInput } from '../use-cases/type/get-type/get-type.input'
import {
  TestGetTypeGql,
  TestGetTypeQuery,
} from '../use-cases/type/get-type/tests/get-type.api.graphql.gen'

export const setupTypeTestModule = () => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    createTestField: (input: CreateFieldInput) =>
      domainRequest<CreateFieldInput, TestCreateFieldMutation>(
        testModule.userApp,
        TestCreateFieldGql,
        input,
      ).then((r) => r.createField),
    createTestType: (input: CreateTypeInput) => {
      return domainRequest<CreateTypeInput, TestCreateTypeMutation>(
        testModule.userApp,
        TestCreateTypeGql,
        input,
      ).then((r) => r.createType)
    },
    getType: (input: GetTypeInput) => {
      return domainRequest<GetTypeInput, TestGetTypeQuery>(
        testModule.userApp,
        TestGetTypeGql,
        input,
      ).then((r) => r.getType)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([TypeModule], {
      role: Role.Guest,
      resetDb: true,
    })
    testModule.userApp = await setupTestModule([TypeModule], {
      role: Role.User,
    })
  })

  afterAll(async () => {
    await teardownTestModule(testModule.guestApp)
    await teardownTestModule(testModule.userApp)
  })

  return testModule
}
