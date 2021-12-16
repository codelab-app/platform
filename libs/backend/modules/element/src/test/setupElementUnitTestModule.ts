import {
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../component.module'
import { ElementCoreModule } from '../element.module'
import { ElementTestModule } from '../infrastructure/element-test-infrastructure.module'

export const setupElementTestModule = (resetDb = true) => {
  const testModule = {
    app: null! as INestApplication,
  }

  beforeAll(async () => {
    testModule.app = await setupTestModule(
      [ElementCoreModule, ElementTestModule, ComponentModule],
      {
        role: Role.Guest,
        resetDb,
      },
    )
  })

  afterAll(async () => {
    await teardownTestModule(testModule.app)
  })

  return testModule
}
