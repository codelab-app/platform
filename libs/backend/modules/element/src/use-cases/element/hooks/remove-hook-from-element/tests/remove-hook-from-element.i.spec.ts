import { domainRequest } from '@codelab/backend/shared/testing'
import { AtomType, QueryMethod } from '@codelab/shared/abstract/core'
import { setupElementTestModule } from '../../../../../test/setupElementTestModule'
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
  const testModule = setupElementTestModule()
  let removeHookInput: RemoveHookFromElementInput

  beforeAll(async () => {
    const createElement = await testModule.createTestElement({
      name: 'Element',
    })

    const { addHookToElement } = await domainRequest<
      AddHookToElementInput,
      TestAddHookToElementMutation
    >(testModule.userApp, TestAddHookToElementGql, {
      elementId: createElement.id,
      type: AtomType.HookQueryConfig,
      config: JSON.stringify({
        url: 'https://github.com',
        queryKey: 'My Query',
        method: QueryMethod.Get,
      }),
    })

    removeHookInput = {
      elementId: createElement.id,
      hookId: addHookToElement.id,
    }
  })

  describe('Guest', () => {
    it('should fail to remove a Hook', async () => {
      await domainRequest(
        testModule.guestApp,
        TestRemoveHookFromElementGql,
        removeHookInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should remove a hook', async () => {
      await domainRequest<
        RemoveHookFromElementInput,
        TestRemoveHookFromElementMutation
      >(testModule.userApp, TestRemoveHookFromElementGql, removeHookInput)

      const getElement = await testModule.getElement({
        where: { id: removeHookInput.elementId },
      })

      expect(getElement?.hooks).toHaveLength(0)
    })
  })
})
