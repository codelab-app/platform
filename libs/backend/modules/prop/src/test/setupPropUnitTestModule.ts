import { InMemoryRepository } from '@codelab/backend/infra'
import {
  setupSimpleTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { IProp } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import {
  IPropRepositoryToken,
  PropTestInfrastructureModule,
} from '../infrastructure'
import { PropCoreModule } from '../prop.module'

export const setupPropUnitTestModule = () => {
  const testModule = {
    app: null! as INestApplication,
    propRepo: null! as InMemoryRepository<IProp>,
  }

  beforeAll(async () => {
    testModule.app = await setupSimpleTestModule([
      PropTestInfrastructureModule,
      PropCoreModule,
    ])
    testModule.propRepo =
      testModule.app.get<InMemoryRepository<IProp>>(IPropRepositoryToken)
  })

  afterAll(async () => {
    await teardownTestModule(testModule.app)
  })

  return testModule
}
