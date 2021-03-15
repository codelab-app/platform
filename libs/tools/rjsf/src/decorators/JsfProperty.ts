import 'reflect-metadata'

interface IJsfProperty {
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
  properties?: any
  [key: string]: any
}

const formatMetadataKey = 'JsfProperty'

export const JsfProperty = (props: IJsfProperty) => (
  target: {} | any,
  name: PropertyKey,
): any => {
  if (props.properties) {
    if (typeof props.properties === 'function') {
      props.properties = getJsfPropertyProps(props.properties)
    }
  }

  if (props.items) {
    if (Array.isArray(props.items) && props.items.length === 1) {
      if (typeof props.items[0] === 'function') {
        // const classDecoratorProps = getJsfProps(Arrays)
        const a = ''
        const b = ''
      }
    }
  }

  const existingMetadata = Reflect.getOwnMetadata(
    formatMetadataKey,
    target.constructor,
  )

  if (existingMetadata) {
    existingMetadata[name] = props
    Reflect.defineMetadata(
      formatMetadataKey,
      existingMetadata,
      target.constructor,
    )
  } else {
    const metadata: any = {}

    metadata[name] = props
    Reflect.defineMetadata(formatMetadataKey, metadata, target.constructor)
  }
}

export const getJsfPropertyProps = (target: Function) => {
  return Reflect.getOwnMetadata(formatMetadataKey, target)
}
