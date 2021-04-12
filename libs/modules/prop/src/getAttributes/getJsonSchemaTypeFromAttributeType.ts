import { PropValueType } from '@codelab/frontend/shared'

export const getJsonSchemaTypeFromAttributeType = (
  type: PropValueType | undefined | null,
) => {
  switch (type) {
    case PropValueType.Boolean:
      return 'boolean'
    case PropValueType.Lambda:
      return 'string'
    case PropValueType.Number:
      return 'number'
    case PropValueType.Prop:
      return 'string'
    case PropValueType.String:
      return 'string'
    default:
      return 'string'
  }
}
