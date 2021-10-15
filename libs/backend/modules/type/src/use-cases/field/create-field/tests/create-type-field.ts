import { domainRequest } from '@codelab/backend/shared/testing'
import { INestApplication } from '@nestjs/common'
import { CreateTypeInput } from '../../../type/create-type'
import {
  TestCreateTypeGql,
  TestCreateTypeMutation,
} from '../../../type/create-type/tests/create-type.api.graphql.gen'
import { CreateFieldInput } from '../create-field.input'
import {
  TestCreateFieldGql,
  TestCreateFieldMutation,
} from './create-field.api.graphql.gen'
import {
  createInterfaceTypeInput,
  createPrimitiveTypeInput,
  partialCreateFieldInput,
} from './data'

export const createPrimitiveType = async (nestApp: INestApplication) => {
  const {
    createType: { id: primitiveTypeId },
  } = await domainRequest<CreateTypeInput, TestCreateTypeMutation>(
    nestApp,
    TestCreateTypeGql,
    createPrimitiveTypeInput,
  )

  return primitiveTypeId
}

export const createInterfaceType = async (nestApp: INestApplication) => {
  const {
    createType: { id: interfaceTypeId },
  } = await domainRequest<CreateTypeInput, TestCreateTypeMutation>(
    nestApp,
    TestCreateTypeGql,
    createInterfaceTypeInput,
  )

  return interfaceTypeId
}

export const createField = async (nestApp: INestApplication) => {
  const primitiveTypeId = await createPrimitiveType(nestApp)
  const interfaceTypeId = await createInterfaceType(nestApp)

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
  const {
    createField: { id: fieldId },
  } = await domainRequest<CreateFieldInput, TestCreateFieldMutation>(
    nestApp,
    TestCreateFieldGql,
    createFieldInput,
  )

  return fieldId
}
