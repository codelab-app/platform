import { domainRequest } from '@codelab/backend/shared/testing'
import { setupPageTestModule } from '../../../test/setupPageTestModule'
import { CreatePageInput } from '../../create-page'
import { GetPageInput } from '../get-page.input'
import { TestGetPageGql } from './get-page.api.graphql.gen'

describe('GetPage', () => {
  const testModule = setupPageTestModule()
  let pageId: string
  let appId: string
  let getPageInput: GetPageInput
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    const app = await testModule.createTestApp({ name: 'App' })

    appId = app.id

    createPageInput = { name: 'My new page', appId }

    const page = await testModule.createTestPage(createPageInput)

    pageId = page.id

    getPageInput = { pageId }
  })

  describe('Guest', () => {
    it('should not get a page', async () => {
      await domainRequest(testModule.guestApp, TestGetPageGql, getPageInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get a page', async () => {
      const page = await testModule.getPage(getPageInput)

      expect(page).toMatchObject({
        id: pageId,
        name: createPageInput.name,
      })
    })
  })
})
