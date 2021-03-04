import { Type } from '@tsed/core'
import { Enum, Property, Required, Schema, Title } from '@tsed/schema'
import { generateGridUiSchema, generateGroupsUiSchema } from '../processors'
import { getJsonSchemaCustom } from '../processors/custom-tsed/getJsonSchemaCustom'
import { getUiSchemaGrid } from './RjsfGrid'
import { AnyI, IMetadata, getRjsfGridProp } from './RjsfGridProp'
import { IRjsfGroupPropMetadata, getRjsfGroupProp } from './RjsfGroupProp'

export const getMetadataForClassType = (
  props: any,
  target: Object,
  propertyKey: string,
) => {
  let metadata: any
  const { clazz } = props

  let tsedSchemaDecorator

  if (props.type && props.type === 'array') {
    const obj: any = {
      type: 'array',
      items: {
        ...getJsonSchemaCustom(clazz as Type<any>),
      },
    }

    if (props.title) {
      obj.title = props.title
    }

    tsedSchemaDecorator = Schema(obj)
  } else {
    const obj = { ...getJsonSchemaCustom(clazz as Type<any>) }

    if (props.title) {
      obj.title = props.title
    }

    tsedSchemaDecorator = Schema(obj)
  }

  tsedSchemaDecorator(target, propertyKey)

  // We will check what kind of decorators the Function has and take appropriate action
  const classDecorators = Reflect.getMetadataKeys(clazz)

  if (classDecorators.includes('RjsfGroup')) {
    const groupProps: Array<IRjsfGroupPropMetadata> = getRjsfGroupProp(
      props.clazz,
    )

    metadata = {
      key: propertyKey,
      propMetadata: {
        ...props,
        uiSchema: generateGroupsUiSchema(props.clazz),
      },
    }
    const propMetadata = metadata.propMetadata as AnyI

    propMetadata[propertyKey] = groupProps
  }

  if (classDecorators.includes('RjsfGrid')) {
    const classDecorator = getUiSchemaGrid(props.clazz)
    const gridProps: Array<IMetadata> = getRjsfGridProp(props.clazz)

    metadata = {
      key: propertyKey,
      propMetadata: {
        ...props,
        uiSchema: generateGridUiSchema(props.clazz),
        'ui:spacing': classDecorator['ui:spacing'],
      },
    }
    const propMetadata = metadata.propMetadata as AnyI

    propMetadata[propertyKey] = gridProps
  }

  // if (!classDecorators.includes('RjsfGrid') || !classDecorators.includes('RjsfGroup')) {
  // 	throw new Error('The class must include RjsfGrid or RjsfGroup decorator')
  // }

  if (
    classDecorators.includes('RjsfGrid') &&
    classDecorators.includes('RjsfGroup')
  ) {
    throw new Error('Class cannot have both RjsfGrid and RjsfGroup decorators')
  }

  return metadata
}

export const getMetadataForBasicType = (
  props: any,
  target: Object,
  propertyKey: string,
) => {
  let metadata: any

  const dataType = Reflect.getMetadata('design:type', target, propertyKey)
  const type = props.type ? props.type : dataType.name.toLowerCase()
  const tsedPropDecorator = Property(type)

  tsedPropDecorator(target, propertyKey)
  if (props.enum) {
    const tsedEnumDecorator = Enum(...props.enum)

    tsedEnumDecorator(target, propertyKey)
  }

  if (props.required) {
    const tsedRequiredDecorator = Required()

    tsedRequiredDecorator(target, propertyKey)
  }

  if (props.title) {
    const tsedTitleDecorator = Title(props.title)

    tsedTitleDecorator(target, propertyKey)
  }

  if (props.type && props.type === 'array') {
    const obj: any = {
      type: 'array',
      items: {
        type: dataType.name.toLowerCase(),
      },
    }

    if (props.title) {
      obj.title = props.title
    }

    const tsedSchemaDecorator = Schema(obj)

    tsedSchemaDecorator(target, propertyKey)
  }

  metadata = {
    key: propertyKey,
    propMetadata: props,
  }

  return metadata
}
