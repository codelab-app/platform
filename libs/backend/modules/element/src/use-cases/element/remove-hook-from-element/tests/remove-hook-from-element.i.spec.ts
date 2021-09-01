import {
  domainRequest,
  Role,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/infra'
import { QueryMethod } from '@codelab/shared/enums'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../element.module'
import { AddHookToElementInput } from '../../add-hook-to-element'
import {
  AddHookToElementGql,
  AddHookToElementMutation,
} from '../../add-hook-to-element/tests/add-hook-to-element.api.graphql'
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
import { RemoveHookFromElementInput } from '../remove-hook-from-element.input'
import {
  RemoveHookFromElementGql,
  RemoveHookFromElementMutation,
} from './remove-hook-from-element.api.graphql'

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
        method: QueryMethod.GET,
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

      const { getElement } = await domainRequest<
        GetElementInput,
        GetElementQuery
      >(userApp, GetElementGql, { elementId: removeHookInput.elementId })

      expect(getElement?.hooks).toHaveLength(0)
    })
  })
})
