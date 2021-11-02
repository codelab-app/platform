import { domainRequest } from '@codelab/backend/shared/testing'
import { setupPageTestModule } from '../../../test/setupPageTestModule'
import { CreatePageInput } from '../create-page.input'
import { TestCreatePageGql } from './create-page.api.graphql.gen'

describe('CreatePage', () => {
  const testModule = setupPageTestModule()
  let appId: string
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    const result = await testModule.createTestApp({ name: 'App' })

    appId = result.id

    createPageInput = {
      name: 'My new page',
      appId,
    }
  })

  describe('Guest', () => {
    it('should fail to create a page', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreatePageGql,
        createPageInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create a page', async () => {
      const { id: pageId } = await testModule.createTestPage(createPageInput)

      expect(pageId).toBeDefined()

      const page = await testModule.getPage({ pageId })

      expect(page).toBeDefined()

      expect(page).toMatchObject({
        id: pageId,
        name: createPageInput.name,
      })
    })
  })
})
