import { domainRequest } from '@codelab/backend/infra'
import { setupTestModule, teardownTestModule } from '@codelab/backend/nestjs'
import { Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { CreateComponentInput } from '../../create-component'
import {
  TestCreateComponentGql,
  TestCreateComponentMutation,
} from '../../create-component/tests/create-component.api.graphql.gen'
import { createComponentInput } from '../../create-component/tests/create-component.data'
import {
  TestGetComponentsGql,
  TestGetComponentsQuery,
} from './get-components.api.graphql.gen'

describe('GetComponents', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentAId: string
  let componentBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.Guest,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.User,
    })

    const createComponentInputA = createComponentInput

    const createComponentInputB = {
      ...createComponentInput,
      name: 'HelloWorld2',
    }

    const componentA = await domainRequest<
      CreateComponentInput,
      TestCreateComponentMutation
    >(userApp, TestCreateComponentGql, createComponentInputA)

    const componentB = await domainRequest<
      CreateComponentInput,
      TestCreateComponentMutation
    >(userApp, TestCreateComponentGql, createComponentInputB)

    componentAId = componentA.createComponent.id
    componentBId = componentB.createComponent.id

    expect(componentA.createComponent.id).toBeDefined()
    expect(componentB.createComponent.id).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get components', async () => {
      await domainRequest(guestApp, TestGetComponentsGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get components', async () => {
      const results = await domainRequest<null, TestGetComponentsQuery>(
        userApp,
        TestGetComponentsGql,
        null,
      )

      expect(results.getComponents).toMatchObject([
        { id: componentAId },
        { id: componentBId },
      ])
    })
  })
})
