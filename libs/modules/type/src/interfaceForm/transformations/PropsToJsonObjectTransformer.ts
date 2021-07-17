import {
  __PropAggregateFragment,
  __PropShallowFragment,
  __PropValueFragment,
  __PropValueShallowFragment,
} from '@codelab/codegen/graphql'
import _ from 'lodash'
import {
  GetByIdFunction,
  JsonKeyValuePair,
  JsonObject,
  JsonValue,
} from './types'

/**
 * Transforms a list of PropAggregates to a simple json object with primitive values
 */
export interface PropsToJsonObjectTransformerOptions {
  /**
   *  pass true if the returned object is to be used to be passed down as props to a react component
   *                     pass false if the returned object is to be used to be passed down to a form
   *
   * Difference between if it's forRendering or not is in EnumTypeValue - when submitting a form we need the id as value,
   * if we're rendering a component - we need the actual value string as value,
   *
   * e.g:
   * for the EnumType, with key "variant" that has the values {id: 0x1, value: "primary"}, {id: 0x2, value: "secondary"},
   * forRendering=true would produce the object {variant: "primary"}
   * forRendering=false would produce the object {variant: 0x1}
   *
   */
  forRendering: boolean

  /** Max amount of type nesting that's allowed, used to prevent infinite loops. Defaults to 100 */
  maxNesting?: number
}

export class PropsToJsonObjectTransformer {
  /** Keeps track of recursive transformations while transforming nested types */
  private iteration = 0

  private readonly forRendering: boolean

  private readonly maxNesting: number

  constructor(options: PropsToJsonObjectTransformerOptions) {
    this.forRendering = options.forRendering
    this.maxNesting = options.maxNesting || 100
  }

  transform(props: Array<__PropAggregateFragment>): JsonObject {
    if (this.iteration > 0) {
      // Everything is handles synchronously in this class, so we shouldn't ever get to this point, but just in case this changes in the future
      throw new Error(
        "PropsToJsonObjectTransformer can't handle doing more than 1 transformation at a time, create another instance instead",
      )
    }

    this.iteration = 0

    const kvps = props.map((prop) => this.propToKeyValuePair(prop))
    const object = this.keyValuePairsToJsonObject(kvps)
    this.iteration = 0

    return object
  }

  /** Transforms a prop aggregate to a primitive json key value pair */
  propToKeyValuePair(prop: __PropAggregateFragment): JsonKeyValuePair {
    const valuesById = _.keyBy(prop.values, (v) => v.id)
    const propsById = _.keyBy(prop.props, (p) => p.id)
    const rootProp = propsById[prop.rootProp.id]
    const key = rootProp.field.key

    const value = this.propValueToModelValue(
      rootProp.value,
      (valueId) => valuesById[valueId],
    )

    return { key, value }
  }

  keyValuePairsToJsonObject = (kvps: Array<JsonKeyValuePair>) => {
    return kvps.reduce<JsonObject>((model, kvp) => {
      model[kvp.key] = kvp.value

      return model
    }, {})
  }

  /**
   * Transforms a shallow prop fragment (without nesting), to a primitive key value pair with the hole of a
   * getValue function for nested values
   */
  shallowPropToKeyValue(
    prop: __PropShallowFragment,
    getValue: GetByIdFunction<__PropValueFragment>,
  ): JsonKeyValuePair {
    const key = prop.field.key

    const value = this.propValueToModelValue(
      prop.value ? getValue(prop.value.id) : null,
      getValue,
    )

    return { key, value }
  }

  /**
   * Transforms a PropValue object to a primitive json value.
   * Throws an error if the the iteration is larger than the configured max nesting
   */
  propValueToModelValue(
    value: __PropValueFragment | __PropValueShallowFragment | null | undefined,
    getValue: (valueId: string) => __PropValueFragment,
  ): JsonValue {
    this.iteration++

    if (this.iteration > this.maxNesting) {
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
      case 'EnumTypeValue':
        // If we're rendering the props, we want the value, if we're submitting - the id
        return this.forRendering ? value.value : value.id
      case 'BooleanValue':
        return value.booleanValue

      case 'ArrayValue': {
        const arrayValue = getValue(value.id)

        if (arrayValue.__typename !== 'ArrayValue') {
          throw new Error('Non-ArrayValue has been passed as an Array value')
        }

        return arrayValue.values.map((valueItem) =>
          this.propValueToModelValue(valueItem, getValue),
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
          this.shallowPropToKeyValue(innerProp, getValue),
        )

        return this.keyValuePairsToJsonObject(innerKvps)
      }

      default:
        throw new Error(
          `Prop Value type ${(value as any).__typename} not recognized`,
        )
    }
  }
}
