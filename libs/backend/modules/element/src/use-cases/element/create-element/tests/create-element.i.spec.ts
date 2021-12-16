import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { TestCreateElementGql } from './create-element.api.graphql.gen'
import { createElementInput } from './create-element.data'

describe('CreateElement', () => {
  const testModule = setupElementTestModule()

  describe('Guest', () => {
    it('should fail to create an element', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateElementGql,
        createElementInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a simple element', async () => {
      const element = await testModule.createTestElement(createElementInput)

      expect(element).toBeDefined()

      const match = (actual: any) =>
        expect(actual).toMatchObject({ ...createElementInput, id: element.id })

      match(element)

      const getElement = await testModule.getElement({
        where: { id: element.id },
      })

      match(getElement)
    })
  })
})
