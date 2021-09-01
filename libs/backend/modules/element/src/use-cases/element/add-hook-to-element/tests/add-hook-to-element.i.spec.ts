import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { HookType, QueryMethod } from '@codelab/shared/enums'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element/create-element.input'
import {
  CreateElementGql,
  CreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql'
import { GetElementInput } from '../../get-element/get-element.input'
import {
  GetElementGql,
  GetElementQuery,
} from '../../get-element/tests/get-element.api.graphql'
import { AddHookToElementInput } from '../add-hook-to-element.input'
import {
  AddHookToElementGql,
  AddHookToElementMutation,
} from './add-hook-to-element.api.graphql'

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
        method: QueryMethod.GET,
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

      const { getElement } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, { elementId: addHookInput.elementId })

      expect(getElement?.hooks).toHaveLength(1)
      expect(getElement?.hooks[0]).toMatchObject({
        id,
        type: HookType.Query,
        config: {
          ...addHookInput.queryHook,
        },
      })
    })
  })
})
