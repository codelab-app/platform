import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../../test/setupElementTestModule'
import { CreatePropMapBindingInput } from '../create-prop-map-binding.input'
import {
  TestCreatePropMapBindingGql,
  TestCreatePropMapBindingMutation,
} from './create-prop-map-binding.api.graphql.gen'

describe('CreatePropMapBindingUseCase', () => {
  const testModule = setupElementTestModule()
  let addPropMappinginput: CreatePropMapBindingInput

  beforeAll(async () => {
    const createElement = await testModule.createTestElement({
      name: 'Element',
    })

    const createElement2 = await testModule.createTestElement({
      name: 'Element',
    })

    addPropMappinginput = {
      elementId: createElement.id,
      targetElementId: createElement2.id,
      sourceKey: 'data',
      targetKey: 'anotherData',
    }
  })

  describe('Guest', () => {
    it('should fail to create a PropMapBinding', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreatePropMapBindingGql,
        addPropMappinginput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a PropMapBinding', async () => {
      await domainRequest<
        CreatePropMapBindingInput,
        TestCreatePropMapBindingMutation
      >(testModule.userApp, TestCreatePropMapBindingGql, addPropMappinginput)

      const getElement = await testModule.getElement({
        where: {
          id: addPropMappinginput.elementId,
        },
      })

      const found = getElement?.propMapBindings.find(
        (b) =>
          b.targetElementId === addPropMappinginput.targetElementId &&
          b.sourceKey === addPropMappinginput.sourceKey &&
          b.targetKey === addPropMappinginput.targetKey,
      )

      expect(found).toBeTruthy()
    })
  })
})
