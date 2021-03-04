import 'reflect-metadata'
import { getMetadataForBasicType, getMetadataForClassType } from './utils'

const formatMetadataKey = 'RjsfGridProp'

export interface IProps {
  row: number
  span: number
  order?: number
  clazz?: Function
  uiSchema?: any
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array'
  title?: string
  enum?: Array<any>
  required?: boolean
}

export interface AnyI {
  [prop: string]: any
}

export interface IMetadata {
  key: string
  propMetadata: IProps | AnyI
}

export function RjsfGridProp(props: IProps) {
  return function (target: Object, propertyKey: string) {
    let metadata: IMetadata

    if (props.clazz) {
      metadata = getMetadataForClassType(props, target, propertyKey)
    } else {
      metadata = getMetadataForBasicType(props, target, propertyKey)
    }

    const annotations: Array<IMetadata> = Reflect.getOwnMetadata(
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

export function getRjsfGridProp(target: any): Array<IMetadata> {
  return Reflect.getOwnMetadata(formatMetadataKey, target)
}
