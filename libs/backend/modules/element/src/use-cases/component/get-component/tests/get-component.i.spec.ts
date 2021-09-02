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
  GetComponentGql,
  GetComponentInput,
  GetComponentQuery,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ComponentModule } from '../../../../component.module'
import { ElementModule } from '../../../../element.module'
import { createComponentInput } from '../../create-component/tests/create-component.data'

describe('GetComponent', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let componentId: string
  let getComponentInput: GetComponentInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([ComponentModule, ElementModule], {
      role: Role.USER,
    })

    const results = await domainRequest<
      CreateComponentInput,
      CreateComponentMutation
    >(userApp, CreateComponentGql, createComponentInput)

    componentId = results.createComponent.id
    getComponentInput = { componentId }

    expect(componentId).toBeDefined()
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to get an component', async () => {
      await domainRequest(guestApp, GetComponentGql, getComponentInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get an component', async () => {
      const results = await domainRequest<GetComponentInput, GetComponentQuery>(
        userApp,
        GetComponentGql,
        getComponentInput,
      )

      expect(results?.getComponent).toMatchObject({
        ...createComponentInput,
        id: componentId,
      })
    })
  })
})
