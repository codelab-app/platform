/**
 * This is basically the `json-schema`
 */
interface IRjsfProperty {
  type: 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array'
  /**
   * We get from reflection using property name
   */
  title?: string
  description?: string
  default?: any
  minLength?: number
  maxLength?: number
  maxItems?: number
  minItems?: number
  required?: boolean
  examples?: Array<any>
  isFixedItem?: boolean
  format?: any
  readOnly?: boolean
  pattern?: any // for regex validation
  items?: any
  // [key: string]: any
}

export const RjsfProperty = (props: IRjsfProperty) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
