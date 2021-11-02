import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { CreateFieldInput } from '../../create-field'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from '../../create-field/tests/create-field.api.graphql.gen'
import {
  createInterfaceType,
  createPrimitiveType,
} from '../../create-field/tests/create-type-field'
import { partialCreateFieldInput } from '../../create-field/tests/data'
import { GetFieldInput } from '../../get-field'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { UpdateFieldInput } from '../update-field.input'
import {
  TestUpdateFieldGql,
  TestUpdateFieldMutation,
} from './update-field.api.graphql.gen'

describe('UpdateField', () => {
  const testModule = setupTypeTestModule()
  let fieldId: string
  let updateFieldInput: UpdateFieldInput

  beforeAll(async () => {
    const primitiveTypeId = await createPrimitiveType(testModule.userApp)
    const interfaceTypeId = await createInterfaceType(testModule.userApp)

    const createFieldInput: CreateFieldInput = {
      name: partialCreateFieldInput.name,
      key: partialCreateFieldInput.key as string,
      description: partialCreateFieldInput.description,
      interfaceId: interfaceTypeId,
      type: {
        existingTypeId: primitiveTypeId,
      },
    }

    // Create a field
    const { createField } = await domainRequest<
      CreateFieldInput,
      TestCreateFieldMutation
    >(testModule.userApp, TestCreateFieldGql, createFieldInput)

    fieldId = createField.id

    // Prepare update field input
    updateFieldInput = {
      fieldId,
      updateData: {
        name: 'Updated Field Name',
        key: createFieldInput.key,
        type: createFieldInput.type,
      },
    }
  })

  describe('Guest', () => {
    it('should not update field', async () => {
      await domainRequest<UpdateFieldInput>(
        testModule.guestApp,
        TestUpdateFieldGql,
        updateFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should update field', async () => {
      const { updateField } = await domainRequest<
        UpdateFieldInput,
        TestUpdateFieldMutation
      >(testModule.userApp, TestUpdateFieldGql, updateFieldInput)

      const matches = (actual: any) =>
        expect(actual).toMatchObject({
          id: fieldId,
          name: updateFieldInput.updateData.name,
        })

      matches(updateField)

      const { getField } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(testModule.userApp, TestGetFieldGql, { byId: { fieldId } })

      matches(getField)
    })
  })
})
