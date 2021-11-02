import { domainRequest } from '@codelab/backend/shared/testing'
import { setupPageTestModule } from '../../../test/setupPageTestModule'
import { CreatePageInput } from '../../create-page'
import { GetPagesInput } from '../get-pages.input'
import { TestGetPagesGql, TestGetPagesQuery } from './get-pages.api.graphql.gen'

describe('GetPages', () => {
  const testModule = setupPageTestModule()
  let pageId: string
  let appId: string
  let getPagesInput: GetPagesInput
  let createPageInput: CreatePageInput

  beforeAll(async () => {
    const result = await testModule.createTestApp({ name: 'App' })

    appId = result.id

    createPageInput = { name: 'My new page', appId }

    const pageResult = await testModule.createTestPage(createPageInput)

    pageId = pageResult.id

    getPagesInput = { byApp: { appId } }
  })

  describe('Guest', () => {
    it('should not get pages', async () => {
      await domainRequest(testModule.guestApp, TestGetPagesGql, getPagesInput, {
        message: 'Unauthorized',
      })
    })
  })

  describe('User', () => {
    it('should get pages', async () => {
      const { pages } = await domainRequest<GetPagesInput, TestGetPagesQuery>(
        testModule.userApp,
        TestGetPagesGql,
        getPagesInput,
      )

      expect(pages).toMatchObject([
        {
          id: pageId,
          name: createPageInput.name,
        },
      ])
    })
  })
})
