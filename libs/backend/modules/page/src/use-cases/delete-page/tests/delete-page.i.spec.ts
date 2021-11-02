import { domainRequest } from '@codelab/backend/shared/testing'
import { setupPageTestModule } from '../../../test/setupPageTestModule'
import { GetPageInput } from '../../get-page/get-page.input'
import { DeletePageInput } from '../delete-page.input'
import {
  TestDeletePageGql,
  TestDeletePageMutation,
} from './delete-page.api.graphql.gen'

describe('DeletePage', () => {
  const testModule = setupPageTestModule()
  let pageId: string
  let appId: string
  let deletePageInput: DeletePageInput
  let getPageInput: GetPageInput

  beforeAll(async () => {
    const app = await testModule.createTestApp({ name: 'App' })

    appId = app.id

    const page = await testModule.createTestPage({ name: 'My new page', appId })

    pageId = page.id

    deletePageInput = { pageId }
    getPageInput = { pageId }
  })

  describe('Guest', () => {
    it('should fail to delete a page', async () => {
      await domainRequest(
        testModule.guestApp,
        TestDeletePageGql,
        deletePageInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should delete a page', async () => {
      const { deletePage } = await domainRequest<
        DeletePageInput,
        TestDeletePageMutation
      >(testModule.userApp, TestDeletePageGql, deletePageInput)

      expect(deletePage?.id).toEqual(deletePageInput.pageId)

      const page = await testModule.getPage(getPageInput)

      expect(page).toBeNull()
    })
  })
})
