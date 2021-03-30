import { PropValueType } from '@codelab/frontend/shared'
import { Attribute } from '@codelab/hasura'

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

export const createPropsFormSchema = (
  attributes: Array<Pick<Attribute, 'key' | 'value_type'>> | undefined,
) => ({
  title: 'Props schema',
  type: 'object',
  properties: attributes?.reduce<Record<string, any>>((props, attribute) => {
    props[attribute.key] = {
      type: getJsonSchemaTypeFromAttributeType(attribute.value_type),
    }

    return props
  }, {}),
})
