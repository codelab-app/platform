import { domainRequest } from '@codelab/backend/shared/testing'
import { setupTypeTestModule } from '../../../../tests/setupTypeTestModule'
import { GetFieldInput } from '../../get-field'
import {
  TestGetFieldGql,
  TestGetFieldQuery,
} from '../../get-field/tests/get-field.api.graphql.gen'
import { CreateFieldInput } from '../create-field.input'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from './create-field.api.graphql.gen'
import { createInterfaceType, createPrimitiveType } from './create-type-field'
import { partialCreateFieldInput } from './data'

describe('CreateField', () => {
  const testModule = setupTypeTestModule()
  let createFieldInput: CreateFieldInput

  beforeAll(async () => {
    const primitiveTypeId = await createPrimitiveType(testModule.userApp)
    const interfaceTypeId = await createInterfaceType(testModule.userApp)

    createFieldInput = {
      name: partialCreateFieldInput.name,
      key: partialCreateFieldInput.key as string,
      description: partialCreateFieldInput.description,
      interfaceId: interfaceTypeId,
      type: {
        existingTypeId: primitiveTypeId,
      },
    }
  })

  describe('Guest', () => {
    it('should not create field', async () => {
      await domainRequest<CreateFieldInput>(
        testModule.guestApp,
        TestCreateFieldGql,
        createFieldInput,
        { message: 'Unauthorized' },
      )
    })
  })

  describe('User', () => {
    it('should create field', async () => {
      const { createField } = await domainRequest<
        CreateFieldInput,
        TestCreateFieldMutation
      >(testModule.userApp, TestCreateFieldGql, createFieldInput)

      const matches = (actual: any) =>
        expect(actual).toMatchObject({
          name: createFieldInput.name,
          key: createFieldInput.key,
          description: createFieldInput.description,
        })

      matches(createField)

      const { getField } = await domainRequest<
        GetFieldInput,
        TestGetFieldQuery
      >(testModule.userApp, TestGetFieldGql, {
        byId: { fieldId: createField.id },
      })

      matches(getField)
    })
  })
})
