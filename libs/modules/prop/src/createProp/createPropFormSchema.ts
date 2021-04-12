import { Attribute } from '@codelab/hasura'
import { getJsonSchemaTypeFromAttributeType } from '../getAttributes/getJsonSchemaTypeFromAttributeType'

export const createPropFormSchema = (
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
