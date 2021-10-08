import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { AtomModule } from '../atom.module'
import { CreateAtomInput } from '../use-cases/create-atom'
import {
  TestCreateAtomGql,
  TestCreateAtomMutation,
} from '../use-cases/create-atom/tests/create-atom.api.graphql.gen'
import { GetAtomInput } from '../use-cases/get-atom'
import {
  TestGetAtomGql,
  TestGetAtomQuery,
} from '../use-cases/get-atom/tests/get-atom.api.graphql.gen'

export const setupAtomTestModule = (resetDb = true) => {
  const testModule = {
    guestApp: null! as INestApplication,
    userApp: null! as INestApplication,
    adminApp: null! as INestApplication,
    createTestAtom: (input: CreateAtomInput) => {
      return domainRequest<CreateAtomInput, TestCreateAtomMutation>(
        testModule.adminApp,
        TestCreateAtomGql,
        input,
      ).then((r) => r?.createAtom)
    },
    getAtom: (input: GetAtomInput) => {
      return domainRequest<GetAtomInput, TestGetAtomQuery>(
        testModule.userApp,
        TestGetAtomGql,
        input,
      ).then((r) => r.atom)
    },
  }

  beforeAll(async () => {
    testModule.guestApp = await setupTestModule([AtomModule], {
      role: Role.Guest,
      resetDb,
    })
    testModule.userApp = await setupTestModule([AtomModule], {
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
