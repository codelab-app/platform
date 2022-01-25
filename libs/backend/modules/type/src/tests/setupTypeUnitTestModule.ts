import { InMemoryRepository } from '@codelab/backend/infra'
import {
  setupSimpleTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { IType } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import {
  ITypeRepositoryToken,
  TypeTestInfrastructureModule,
} from '../infrastructure'
import { TypeCoreModule } from '../Type.module'

export const setupTypeUnitTestModule = () => {
  const testModule = {
    app: null! as INestApplication,
    typeRepo: null! as InMemoryRepository<IType>,
  }

  beforeAll(async () => {
    testModule.app = await setupSimpleTestModule([
      TypeTestInfrastructureModule,
      TypeCoreModule,
    ])
    testModule.typeRepo =
      testModule.app.get<InMemoryRepository<IType>>(ITypeRepositoryToken)
  })

  afterAll(async () => {
    await teardownTestModule(testModule.app)
  })

  return testModule
}
