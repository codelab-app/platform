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
  HookType,
  QueryMethod,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'

describe('AddHookToElementUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let addHookInput: AddHookToElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], {
      role: Role.GUEST,
    })
    userApp = await setupTestModule([ElementModule], {
      role: Role.USER,
    })

    const { createElement } = await domainRequest<
      CreateElementInput,
      CreateElementMutation
    >(userApp, CreateElementGql, { name: 'Element' })

    addHookInput = {
      elementId: createElement.id,
      queryHook: {
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.Get,
      },
    }
  })

  afterAll(async () => {
    await teardownTestModule(guestApp)
    await teardownTestModule(userApp)
  })

  describe('Guest', () => {
    it('should fail to add a Hook to an Element', async () => {
      await domainRequest(guestApp, AddHookToElementGql, addHookInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should add a Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await domainRequest<AddHookToElementInput, AddHookToElementMutation>(
        userApp,
        AddHookToElementGql,
        addHookInput,
      )

      expect(id).toBeDefined()

      const { getElementGraph } = await domainRequest<
        GetElementGraphInput,
        GetElementGraphQuery
      >(userApp, GetElementGraphGql, { elementId: addHookInput.elementId })

      const element = getElementGraph?.vertices[0] as ElementFragment

      expect(element.hooks).toHaveLength(1)
      expect(element.hooks[0]).toMatchObject({
        id,
        type: HookType.Query,
        config: {
          ...addHookInput.queryHook,
        },
      })
    })
  })
})
