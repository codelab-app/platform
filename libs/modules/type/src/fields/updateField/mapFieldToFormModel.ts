import {
  __FieldFragment,
  __TypeFragment,
  PrimitiveType,
} from '@codelab/codegen/graphql'
import { InterfaceContextType } from '../../interfaces'
import {
  CreateFieldArrayTypeObject,
  CreateFieldTypeObject,
  TypeVariant,
} from '../createField'
import { UpdateFieldSchemaType } from './updateFieldSchema'

export const mapFieldToFormModel = (
  field: __FieldFragment | undefined,
  typesById: InterfaceContextType['interfaceTypesById'],
): UpdateFieldSchemaType | undefined => {
  if (!field) {
    return undefined
  }

  const getType = (id: string) => {
    const type = typesById[id]

    if (!type) {
      throw new Error(`Type with ID ${id} not found`)
    }

    return type
  }

  const mapTypeFragmentToSchemaTypeFields = (
    type: __TypeFragment,
    iteration = 0,
  ):
    | CreateFieldTypeObject
    | (CreateFieldArrayTypeObject & { type: TypeVariant.Array }) => {
    if (iteration > 10) {
      // Shouldn't ever happen, but just in case
      throw new Error('Type too nested')
    }

    switch (type.__typename) {
      case 'Interface':
        return {
          type: TypeVariant.Interface,
          interfaceId: type.id,
        }
      case 'SimpleType':
        return {
          type: type.primitiveType,
        }
      case 'ArrayType':
        return {
          type: TypeVariant.Array,
          arrayType: {
            ...(mapTypeFragmentToSchemaTypeFields(
              getType(type.typeId),
              iteration + 1,
            ) as CreateFieldTypeObject),
          },
        }
      case 'EnumType':
        return {
          type: TypeVariant.Enum,
          allowedValues: type.allowedValues.map((v) => v.name),
        }
      default:
        throw new Error(`Type ${(type as any).__typename} not recognized`)
    }
  }

  return {
    key: field.key,
    name: field.name,
    description: field.description,
    arrayType: { type: PrimitiveType.String },
    ...mapTypeFragmentToSchemaTypeFields(getType(field.typeId)),
  }
}
