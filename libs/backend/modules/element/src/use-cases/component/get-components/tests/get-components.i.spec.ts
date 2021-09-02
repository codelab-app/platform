import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  CreateComponentGql,
  CreateComponentInput,
  CreateComponentMutation,
  GetComponentsGql,
  GetComponentsQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { createComponentInput } from '../../create-component/tests/create-component.data'

describe('GetComponents', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentAId: string
  let componentBId: string

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.USER,
    })

    const createComponentInputA = createComponentInput

    const createComponentInputB = {
      ...createComponentInput,
      name: 'HelloWorld2',
    }

    const componentA = await domainRequest<
      CreateComponentInput,
      CreateComponentMutation
    >(userApp, CreateComponentGql, createComponentInputA)

    const componentB = await domainRequest<
      CreateComponentInput,
      CreateComponentMutation
    >(userApp, CreateComponentGql, createComponentInputB)

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
      await domainRequest(guestApp, GetComponentsGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get components', async () => {
      const results = await domainRequest<null, GetComponentsQuery>(
        userApp,
        GetComponentsGql,
        null,
      )

      expect(results.getComponents).toMatchObject([
        { id: componentAId },
        { id: componentBId },
      ])
    })
  })
})
