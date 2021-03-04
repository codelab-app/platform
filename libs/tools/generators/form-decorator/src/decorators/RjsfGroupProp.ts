import 'reflect-metadata'
import { AnyI } from './RjsfGridProp'
import { getMetadataForBasicType, getMetadataForClassType } from './utils'

const formatMetadataKey = 'RjsfGroupProp'

export interface IRjsfGroupProp {
  panelTitle: string
  title?: string
  order?: number
  clazz?: Function
  uiSchema?: any
  type?: 'string' | 'number' | 'integer' | 'boolean'
  enum?: Array<any>
  required?: boolean
}

export interface IRjsfGroupPropMetadata {
  key: string
  propMetadata: IRjsfGroupProp | AnyI
}

export const RjsfGroupProp = (props: IRjsfGroupProp) => {
  return (target: Object, propertyKey: string) => {
    let metadata: IRjsfGroupPropMetadata

    if (props.clazz) {
      metadata = getMetadataForClassType(props, target, propertyKey)
    } else {
      metadata = getMetadataForBasicType(props, target, propertyKey)
    }

    const annotations: Array<IRjsfGroupPropMetadata> = Reflect.getOwnMetadata(
      formatMetadataKey,
      target.constructor,
    )

    if (annotations) {
      annotations.push(metadata)
      Reflect.defineMetadata(formatMetadataKey, annotations, target.constructor)
    } else {
      Reflect.defineMetadata(formatMetadataKey, [metadata], target.constructor)
    }
  }
}

export const getRjsfGroupProp = (
  target: Function,
): Array<IRjsfGroupPropMetadata> => {
  return Reflect.getOwnMetadata(formatMetadataKey, target)
}
