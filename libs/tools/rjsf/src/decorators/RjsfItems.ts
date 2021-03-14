import { JSONSchema7TypeName } from 'json-schema'

/**
 * items: {}
 */
interface IRjsfItems {
  type: JSONSchema7TypeName
  default?: any
  enum?: Array<string>
  // Used for nesting
  key?: string
  parent?: string
  $ref?: any
}

export const RjsfItems = (props: IRjsfItems) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
