import {
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementCoreModule } from '../element.module'
import { ElementTestInfrastructureModule } from '../infrastructure/modules/element-test-infrastructure.module'

/**
 * Sets up a test app for unit testing the Element module.
 */
export const setupElementUnitTestModule = () => {
  const testModule = {
    app: null! as INestApplication,
  }

  beforeAll(async () => {
    testModule.app = await setupTestModule(
      [ElementCoreModule, ElementTestInfrastructureModule],
      {
        role: Role.Guest,
        resetDb: false,
      },
    )
  })

  afterAll(async () => {
    await teardownTestModule(testModule.app)
  })

  return testModule
}
