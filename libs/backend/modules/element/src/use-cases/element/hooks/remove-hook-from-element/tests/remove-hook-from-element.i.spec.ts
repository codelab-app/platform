import {
  domainRequest,
  setupTestModule,
  teardownTestModule,
} from '@codelab/backend/shared/testing'
import { QueryMethod, Role } from '@codelab/shared/abstract/core'
import { INestApplication } from '@nestjs/common'
import { ElementModule } from '../../../../../element.module'
import { CreateElementInput } from '../../../create-element'
import {
  TestCreateElementGql,
  TestCreateElementMutation,
} from '../../../create-element/tests/create-element.api.graphql.gen'
import { GetElementInput } from '../../../get-element'
import {
  TestGetElementGql,
  TestGetElementQuery,
} from '../../../get-element/tests/get-element.api.graphql.gen'
import { AddHookToElementInput } from '../../add-hook-to-element'
import {
  TestAddHookToElementGql,
  TestAddHookToElementMutation,
} from '../../add-hook-to-element/tests/add-hook-to-element.api.graphql.gen'
import { RemoveHookFromElementInput } from '../remove-hook-from-element.input'
import {
  TestRemoveHookFromElementGql,
  TestRemoveHookFromElementMutation,
} from './remove-hook-from-element.api.graphql.gen'

describe('RemoveHookFromElementUseCase', () => {
  let guestApp: INestApplication
  let userApp: INestApplication
  let removeHookInput: RemoveHookFromElementInput

  beforeAll(async () => {
    guestApp = await setupTestModule([ElementModule], { role: Role.Guest })
    userApp = await setupTestModule([ElementModule], { role: Role.User })

    const { createElement } = await domainRequest<
      CreateElementInput,
      TestCreateElementMutation
    >(userApp, TestCreateElementGql, { name: 'Element' })

    const { addHookToElement } = await domainRequest<
      AddHookToElementInput,
      TestAddHookToElementMutation
    >(userApp, TestAddHookToElementGql, {
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
      await domainRequest(
        guestApp,
        TestRemoveHookFromElementGql,
        removeHookInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      await domainRequest<
        RemoveHookFromElementInput,
        TestRemoveHookFromElementMutation
      >(userApp, TestRemoveHookFromElementGql, removeHookInput)

      const { getElement } = await domainRequest<
        GetElementInput,
        TestGetElementQuery
      >(userApp, TestGetElementGql, { elementId: removeHookInput.elementId })

      expect(getElement?.hooks).toHaveLength(0)
    })
  })
})
