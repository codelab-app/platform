import { __TypeFragment } from '@codelab/shared/codegen/graphql'
import { TypeModels } from './TypeModels'

export const getTypeName = (
  type: __TypeFragment | null | undefined,
  getArrayItemType: (typeId: string) => __TypeFragment | null | undefined,
  iteration = 0,
): string => {
  if (!type) {
    return ''
  }

  if (iteration > 10) {
    return ''
  }

  switch (type?.__typename) {
    case TypeModels.PrimitiveType:
      return type.primitiveKind

    case TypeModels.ArrayType: {
      const itemType = getArrayItemType(type.id)

      return `Array of ${getTypeName(
        itemType,
        getArrayItemType,
        iteration + 1,
      )}`
    }

    case TypeModels.EnumType:
      return `Enum (${type.allowedValues.map((v) => v.name).join(',')})`
    case TypeModels.InterfaceType:
      return `Object (${type.name})`
    default:
      return ''
  }
}
