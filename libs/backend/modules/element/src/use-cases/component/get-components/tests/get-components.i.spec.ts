import { domainRequest } from '@codelab/backend/shared/testing'
import { setupElementTestModule } from '../../../../test/setupElementTestModule'
import { createComponentInput } from '../../create-component/tests/create-component.data'
import {
  TestGetComponentsGql,
  TestGetComponentsQuery,
} from './get-components.api.graphql.gen'

describe('GetComponents', () => {
  const testModule = setupElementTestModule()
  let componentAId: string
  let componentBId: string

  beforeAll(async () => {
    const createComponentInputA = createComponentInput

    const createComponentInputB = {
      ...createComponentInput,
      name: 'HelloWorld2',
    }

    const componentA = await testModule.createComponent(createComponentInputA)
    const componentB = await testModule.createComponent(createComponentInputB)

    componentAId = componentA.id
    componentBId = componentB.id

    expect(componentA.id).toBeDefined()
    expect(componentB.id).toBeDefined()
  })

  describe('Guest', () => {
    it('should fail to get components', async () => {
      await domainRequest(testModule.guestApp, TestGetComponentsGql, null, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get components', async () => {
      const results = await domainRequest<null, TestGetComponentsQuery>(
        testModule.userApp,
        TestGetComponentsGql,
        null,
      )

      expect(results.getComponents).toMatchObject([
        { id: componentAId },
        { id: componentBId },
      ])
    })
  })
})
