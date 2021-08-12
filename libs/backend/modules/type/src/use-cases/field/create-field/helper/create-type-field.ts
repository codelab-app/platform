import { domainRequest } from '@codelab/backend/infra'
import {
  CreateFieldGql,
  CreateFieldInput,
  CreateFieldMutation,
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
} from '@codelab/shared/codegen/graphql'
import { INestApplication } from '@nestjs/common'
import {
  createInterfaceTypeInput,
  createPrimitiveTypeInput,
  partialCreateFieldInput,
} from './data'

export const createPrimitiveType = async (nestApp: INestApplication) => {
  const {
    createType: { id: primitiveTypeId },
  } = await domainRequest<CreateTypeInput, CreateTypeMutation>(
    nestApp,
    CreateTypeGql,
    createPrimitiveTypeInput,
  )

  return primitiveTypeId
}

export const createInterfaceType = async (nestApp: INestApplication) => {
  const {
    createType: { id: interfaceTypeId },
  } = await domainRequest<CreateTypeInput, CreateTypeMutation>(
    nestApp,
    CreateTypeGql,
    createInterfaceTypeInput,
  )

  return interfaceTypeId
}

export const createField = async (nestApp: INestApplication) => {
  const primitiveTypeId = await createPrimitiveType(nestApp)
  const interfaceTypeId = await createInterfaceType(nestApp)

  const createFieldInput: CreateFieldInput = {
    name: partialCreateFieldInput.name!,
    key: partialCreateFieldInput.key!,
    description: partialCreateFieldInput.description,
    interfaceId: interfaceTypeId,
    type: {
      existingTypeId: primitiveTypeId,
    },
  }

  // Create a field
  const {
    createField: { id: fieldId },
  } = await domainRequest<CreateFieldInput, CreateFieldMutation>(
    nestApp,
    CreateFieldGql,
    createFieldInput,
  )

  return fieldId
}
