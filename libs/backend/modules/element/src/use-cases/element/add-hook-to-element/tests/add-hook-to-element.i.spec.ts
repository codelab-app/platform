import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { HookType, QueryMethod } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { CreateElementInput } from '../../create-element/create-element.input'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../create-element/tests/create-element.api.graphql.gen'
import { GetElementInput } from '../../get-element/get-element.input'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../get-element/tests/get-element.api.graphql.gen'
import { AddHookToElementInput } from '../add-hook-to-element.input'
import {
  TestAddHookToElementGql,
  TestAddHookToElementMutation,
} from './add-hook-to-element.api.graphql.gen'

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
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, { name: 'Element' })

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
      await domainRequest(guestApp, TestAddHookToElementGql, addHookInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should add a Hook to an Element', async () => {
      const {
        addHookToElement: { id },
      } = await domainRequest<
        AddHookToElementInput,
        TestAddHookToElementMutation
      >(userApp, TestAddHookToElementGql, addHookInput)

      expect(id).toBeDefined()

      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, { elementId: addHookInput.elementId })

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
