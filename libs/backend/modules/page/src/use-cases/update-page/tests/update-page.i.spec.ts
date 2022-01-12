import { domainRequest } from '@codelab/backend/shared/testing'
import { setupPageTestModule } from '../../../test/setupPageTestModule'
import { CreatePageInput } from '../../create-page'
import { UpdatePageInput } from '../update-page.input'
import {
  TestUpdatePageGql,
  TestUpdatePageMutation,
} from './update-page.api.graphql.gen'

describe('UpdatePage', () => {
  const testModule = setupPageTestModule()
  let pageId: string
  let appId: string
  let updatePageInput: UpdatePageInput
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    const result = await testModule.createTestApp({ name: 'App' })

    appId = result.id

    createPageInput = { name: 'My new page', appId }

    const pageResult = await testModule.createTestPage(createPageInput)

    pageId = pageResult.id

    updatePageInput = { pageId, updateData: { name: 'New name' } }
  })

  describe('Guest', () => {
    it('should not update page', async () => {
      await domainRequest(
        testModule.guestApp,
        TestUpdatePageGql,
        updatePageInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should update page', async () => {
      const { updatePage } = await domainRequest<
        UpdatePageInput,
        TestUpdatePageMutation
      >(testModule.userApp, TestUpdatePageGql, updatePageInput)

      expect(updatePage).toMatchObject({
        id: pageId,
        name: updatePageInput.updateData.name,
      })
    })
  })
})
