import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import {
  AddHookToElementGql,
  AddHookToElementInput,
  AddHookToElementMutation,
  CreateElementGql,
  CreateElementInput,
  CreateElementMutation,
  ElementFragment,
  GetElementGraphGql,
  GetElementGraphInput,
  GetElementGraphQuery,
  QueryMethod,
  RemoveHookFromElementGql,
  RemoveHookFromElementInput,
  RemoveHookFromElementMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'

describe('RemoveHookFromElementUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let removeHookInput: RemoveHookFromElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.GUEST })
    userApp = await setupTestModule([ElementModule], { role: Role.USER })

    const { createElement } = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, { name: 'Element' })

    const { addHookToElement } = await domainRequest<
      AddHookToElementInput,
      AddHookToElementMutation
    >(userApp, AddHookToElementGql, {
      elementId: createElement.id,
      queryHook: {
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.Get,
      },
    })

    removeHookInput = {
      elementId: createElement.id,
      hookId: addHookToElement.id,
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to create a Hook', async () => {
      await domainRequest(guestApp, RemoveHookFromElementGql, removeHookInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      await domainRequest<
        RemoveHookFromElementInput,
        RemoveHookFromElementMutation
      >(userApp, RemoveHookFromElementGql, removeHookInput)

      const { getElementGraph } = await domainRequest<
        GetElementGraphInput,
        GetElementGraphQuery
      >(userApp, GetElementGraphGql, { elementId: removeHookInput.elementId })

      const element = getElementGraph?.vertices[0] as ElementFragment

      expect(element.hooks).toHaveLength(0)
    })
  })
})
