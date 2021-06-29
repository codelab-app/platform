import {
  CreateFieldInput,
  CreateTypeInput,
  PrimitiveType,
} from '@codelab/codegen/graphql'
import { notify } from '@codelab/frontend/shared'
import {
  CreateFieldSchemaObject,
  CreateFieldTypeObject,
  TypeVariant,
} from './createFieldSchema'

export const mapTypeInput = (
  typeData: CreateFieldTypeObject,
  counter = 0,
): CreateTypeInput => {
  const type = typeData.type

  switch (type) {
    case TypeVariant.Array:
      if (counter > 10) {
        // This can't really happen, unless we f up something, because we can't nest array types right now
        notify({ type: 'error', title: 'Type too nested' })
        throw new Error('Type too nested')
      }

      return {
        arrayType: {
          type: mapTypeInput(
            (typeData as CreateFieldSchemaObject).arrayType,
            counter + 1,
          ),
        },
      }
    case TypeVariant.Interface:
      return { interfaceType: { interfaceId: typeData.interfaceId as string } }
    case TypeVariant.Enum:
      return { enumType: { allowedValues: typeData.allowedValues || [] } }
    case PrimitiveType.String:
    case PrimitiveType.Integer:
    case PrimitiveType.Float:
    case PrimitiveType.Boolean:
      return { simpleType: { primitiveType: type } }

    default: {
      notify({ type: 'error', title: 'Error while processing type' })
      throw new Error('Type not recognized: ' + type)
    }
  }
}

export const mapFormDataToInput = (
  formData: CreateFieldSchemaObject,
  parentInterfaceId: string,
): CreateFieldInput => {
  return {
    key: formData.key,
    interfaceId: parentInterfaceId,
    name: formData.name,
    description: formData.description,
    type: mapTypeInput(formData),
  }
}
