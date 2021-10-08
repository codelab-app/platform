import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { createField } from '../../create-field/tests/create-type-field'
import { GetFieldInput } from '../../get-field'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { DeleteFieldInput } from '../delete-field.input'
import { TestDeleteFieldGql } from './delete-field.api.graphql.gen'

describe('DeleteField', () => {
  const testModule = setupTypeTestModule()
  let fieldId: string
  let deleteFieldInput: DeleteFieldInput

  beforeAll(async () => {
    fieldId = await createField(testModule.userApp)

    deleteFieldInput = { fieldId }
  })

  describe('Guest', () => {
    it('should not delete field', async () => {
      await domainRequest<DeleteFieldInput>(
        testModule.guestApp,
        TestDeleteFieldGql,
        deleteFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should delete field', async () => {
      await domainRequest<DeleteFieldInput>(
        testModule.userApp,
        TestDeleteFieldGql,
        deleteFieldInput,
      )

      const { getField: field } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(testModule.userApp, TestGetFieldGql, { byId: { fieldId } })

      expect(field).toBeNull()
    })
  })
})
