import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { createField } from '../../create-field/tests/create-type-field'
import { partialCreateFieldInput } from '../../create-field/tests/data'
import { GetFieldInput } from '../get-field.input'
import { TestGetFieldGql, TestGetFieldQuery } from './get-field.api.graphql.gen'

describe('GetField', () => {
  const testModule = setupTypeTestModule()
  let fieldId: string
  let getFieldInput: GetFieldInput

  beforeAll(async () => {
    fieldId = await createField(testModule.userApp)

    getFieldInput = { byId: { fieldId } }
  })

  describe('Guest', () => {
    it('should not get field', async () => {
      await domainRequest<GetFieldInput>(
        testModule.guestApp,
        TestGetFieldGql,
        getFieldInput,
        {
          message: 'Unauthorized',
        },
      )
    })
  })

  describe('User', () => {
    it('should get field', async () => {
      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(testModule.userApp, TestGetFieldGql, getFieldInput)

      expect(field).toBeDefined()
      expect(field).toMatchObject(partialCreateFieldInput)
    })
  })
})
