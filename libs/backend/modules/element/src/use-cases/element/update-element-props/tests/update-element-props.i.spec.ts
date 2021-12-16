import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createElementInput } from '../../create-element/tests/create-element.data'
import { UpdateElementPropsInput } from '../update-element-props.input'
import { TestUpdateElementPropsGql } from './update-element-props.api.graphql.gen'

describe('UpdateElementProps', () => {
  const testModule = setupElementTestModule()
  let elementId: string
  let updatePropsInput: UpdateElementPropsInput

  beforeAll(async () => {
    const results = await testModule.createTestElement(createElementInput)

    elementId = results.id

    expect(elementId).toBeDefined()

    updatePropsInput = {
      elementId,
      data: JSON.stringify({ someProp: true, otherProp: { hello: 'world' } }),
    }
  })

  describe('Guest', () => {
    it('should fail to update an elements props', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdateElementPropsGql,
        updatePropsInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update an elements props', async () => {
      await domainRequest<UpdateElementPropsInput>(
        testModule.userApp,
        TestUpdateElementPropsGql,
        updatePropsInput,
      )

      const element = await testModule.getElement({ where: { id: elementId } })

      expect(element).toBeDefined()
      expect(element?.props.data).toStrictEqual(updatePropsInput.data)
    })
  })
})
