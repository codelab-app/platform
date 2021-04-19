import { ValueType } from '@codelab/frontend/shared'

export const getJsonSchemaTypeFromValueType = (
  type: ValueType | undefined | null,
) => {
  switch (type) {
    case ValueType.Boolean:
      return 'boolean'
    case ValueType.Lambda:
      return 'string'
    case ValueType.Number:
      return 'number'
    case ValueType.Prop:
      return 'string'
    case ValueType.String:
      return 'string'
    default:
      return 'string'
  }
}
