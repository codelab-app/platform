import {
  __PropAggregateFragment,
  __PropShallowFragment,
  __PropValueFragment,
  __PropValueShallowFragment,
} from '@codelab/codegen/graphql'
import _ from 'lodash'

export type PrimitivePropValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<PrimitivePropValue>
  | PropModel

export interface PropModel {
  [key: string]: PrimitivePropValue
}

interface PropKeyValuePair {
  key: string
  value: PrimitivePropValue
}

/** Converts a list of PropAggregates to a simple json object with primitive key-values */
export class PropsJsonModelAdaptor {
  static propsToModel(props: Array<__PropAggregateFragment>): PropModel {
    const kvps = props.map((prop) => PropsJsonModelAdaptor.propToKeyValue(prop))

    return PropsJsonModelAdaptor.propKeyValuePairsToModel(kvps)
  }

  static propKeyValuePairsToModel(kvps: Array<PropKeyValuePair>): PropModel {
    return kvps.reduce<PropModel>((model, kvp) => {
      model[kvp.key] = kvp.value

      return model
    }, {})
  }

  static propToKeyValue(prop: __PropAggregateFragment): PropKeyValuePair {
    const valuesById = _.keyBy(prop.values, (v) => v.id)
    const propsById = _.keyBy(prop.props, (p) => p.id)
    const rootProp = propsById[prop.rootProp.id]
    const key = rootProp.field.key

    const value = PropsJsonModelAdaptor.propValueToModelValue(
      rootProp.value,
      (valueId) => valuesById[valueId],
    )

    return { key, value }
  }

  static shallowPropToKeyValue(
    prop: __PropShallowFragment,
    getValue: (valueId: string) => __PropValueFragment,
    iteration = 0,
  ): PropKeyValuePair {
    const key = prop.field.key

    const value = PropsJsonModelAdaptor.propValueToModelValue(
      prop.value ? getValue(prop.value.id) : null,
      getValue,
      iteration,
    )

    return { key, value }
  }

  private static propValueToModelValue(
    value: __PropValueFragment | __PropValueShallowFragment | null | undefined,
    getValue: (valueId: string) => __PropValueFragment,
    iteration = 0,
  ): PrimitivePropValue {
    if (iteration > 100) {
      throw new Error('Value too nested')
    }

    if (!value) {
      return undefined
    }

    switch (value.__typename) {
      case 'StringValue':
        return value.stringValue
      case 'IntValue':
        return value.intValue
      case 'FloatValue':
        return value.floatValue
      case 'BooleanValue':
        return value.booleanValue

      case 'ArrayValue': {
        const arrayValue = getValue(value.id)

        if (arrayValue.__typename !== 'ArrayValue') {
          throw new Error('Non-ArrayValue has been passed as an Array value')
        }

        return arrayValue.values.map((valueItem) =>
          PropsJsonModelAdaptor.propValueToModelValue(
            valueItem,
            getValue,
            iteration + 1,
          ),
        )
      }

      case 'InterfaceValue': {
        const interfaceValue = getValue(value.id)

        if (interfaceValue.__typename !== 'InterfaceValue') {
          throw new Error('Non-Interface value passes as an Interface value')
        }

        const innerProps = interfaceValue.props.map((interfaceProp) => ({
          ...interfaceProp,
          value: interfaceProp.value ? getValue(interfaceProp.value.id) : null,
        }))

        const innerKvps = innerProps.map((innerProp) =>
          PropsJsonModelAdaptor.shallowPropToKeyValue(
            innerProp,
            getValue,
            iteration + 1,
          ),
        )

        return PropsJsonModelAdaptor.propKeyValuePairsToModel(innerKvps)
      }

      default:
        throw new Error(
          `Prop Value type ${(value as any).__typename} not recognized`,
        )
    }
  }
}
