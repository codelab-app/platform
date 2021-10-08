import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTagTestModule } from '../../../test/setupTagTestModule'
import { TestCreateTagGql } from './create-tag.api.graphql.gen'
import { createTagInput } from './create-tag.data'

describe('CreateTagUseCase', () => {
  const testModule = setupTagTestModule()

  describe('Guest', () => {
    it('should fail to create a Tag', async () => {
      await domainRequest(
        testModule.guestApp,
        TestCreateTagGql,
        createTagInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should create an App', async () => {
      const tag = await testModule.createTag(createTagInput)

      const match = (actual: any) =>
        expect(actual).toMatchObject({ ...createTagInput, id: tag.id })

      match(tag)

      const getTag = await testModule.getTag({ where: { id: tag.id } })

      match(getTag)
    })
  })
})
