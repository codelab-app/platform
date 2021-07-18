import {
  __FieldFragment,
  __PrimitiveTypeFragment,
  __PropFragment,
  __PropValueFragment,
  __TypeFragment,
  PrimitiveKind,
  UpsertPropsInput,
  UpsertValueInput,
} from '@codelab/codegen/graphql'
import { TypeModels } from '../../types/TypeModels'
import { JsonObject, JsonValue } from './types'

export interface JsonObjectToUpsertValueTransformerOptions {
  /** All the types that might be needed to construct the UpsertValueInput */
  types: Array<__TypeFragment>

  /**
   * All the previous props that might be needed to construct the UpsertValueInput
   * If omitted, or if a prop is not found - it will be Inserted as a new value. If present - existing props will be Updated
   */
  existingProps?: Array<__PropFragment>

  /**
   * Needed for handling existing props, because in nested props values are referenced by ID, to avoid recursion in graphql
   */
  existingValues?: Array<__PropValueFragment>

  /** Max amount of type nesting that's allowed, used to prevent infinite loops. Defaults to 100 */
  maxNesting?: number
}

export class JsonObjectToUpsertValueTransformer {
  private _typesById: Map<string, __TypeFragment>

  private _propsById: Map<string, __PropFragment>

  private _valuesById: Map<string, __PropValueFragment>

  private propsByFieldId: Map<string, __PropFragment>

  private readonly maxNesting: number

  /** Keeps track of recursive transformations while transforming nested types */
  private iteration = 0

  private getType(typeId: string) {
    return this._typesById.get(typeId)
  }

  private getProp(propId: string) {
    return this._propsById.get(propId)
  }

  private getValue(valueId: string) {
    return this._valuesById.get(valueId)
  }

  private getPropByFieldId(fieldId: string) {
    return this.propsByFieldId.get(fieldId)
  }

  constructor(private options: JsonObjectToUpsertValueTransformerOptions) {
    this._typesById = new Map(options.types.map((type) => [type.id, type]))
    this._propsById = new Map(
      options.existingProps?.map((innerProp) => [innerProp.id, innerProp]) ||
        [],
    )
    this._valuesById = new Map(
      options.existingValues?.map((value) => [value.id, value]) || [],
    )

    this.propsByFieldId = new Map(
      options.existingProps?.map((innerProp) => [
        innerProp.field.id,
        innerProp,
      ]) || [],
    )

    this.maxNesting = options.maxNesting || 100
  }

  transform(
    jsonModel: JsonObject,
    fields: Array<__FieldFragment>,
  ): Array<Pick<UpsertPropsInput, 'value' | 'fieldId' | 'propId'>> {
    if (this.iteration > 0) {
      // Everything is handles synchronously in this class, so we shouldn't ever get to this point, but just in case this changes in the future
      throw new Error(
        "PropsToJsonObjectTransformer can't handle doing more than 1 transformation at a time, create another instance instead",
      )
    }

    this.iteration = 0

    const result = fields.map((field) => {
      // Get the value from the jsonModel that matches this key
      const jsonModelValue = jsonModel[field.key]
      const initialProp = this.getPropByFieldId(field.id)

      // Create a value input based of it
      const valueInput = this.jsonValueToValueInput(
        jsonModelValue,
        field.typeId,
        field.id,
        initialProp,
      )

      return {
        fieldId: field.id,
        value: valueInput,
        propId: initialProp?.id,
      }
    })

    this.iteration = 0

    return result
  }

  jsonValueToValueInput(
    jsonValue: JsonValue,
    typeId: string,
    fieldId: string,
    initialProps?: __PropFragment,
  ): UpsertValueInput | null {
    if (typeof jsonValue === 'undefined' || jsonValue == null) {
      return null
    }

    this.iteration++

    if (this.iteration > this.maxNesting) {
      throw new Error('Value too nested')
    }

    const type = this.getType(typeId)

    if (!type) {
      throw new Error(`Type with id ${typeId} not found`)
    }

    switch (type.__typename) {
      case TypeModels.PrimitiveType:
        return this.jsonValueToPrimitiveValueInput(jsonValue, type)
      case TypeModels.ArrayType:
        if (!Array.isArray(jsonValue)) {
          throw new Error('Cannot convert non-array value to an array')
        }

        return {
          arrayValue: {
            values: jsonValue
              .map((v) =>
                this.jsonValueToValueInput(
                  v,
                  type.typeId,
                  fieldId,
                  initialProps,
                ),
              )
              .filter((v): v is UpsertValueInput => !!v),
          },
        }
      case TypeModels.EnumType:
        return {
          enumValueId: jsonValue.toString(),
        }

      case TypeModels.Interface: {
        if (typeof jsonValue !== 'object' || Array.isArray(jsonValue)) {
          throw new Error('Cannot convert value to an interface value')
        }

        const valueId = initialProps?.value?.id
        const value = valueId ? this.getValue(valueId) : null

        if (value && value.__typename !== 'InterfaceValue') {
          throw new Error('Props type mismatch')
        }

        const props = value?.props
          .map((p) => this.getProp(p.id))
          .filter((p) => !!p) as Array<__PropFragment>

        const innerTransformer = new JsonObjectToUpsertValueTransformer({
          ...this.options,
          existingProps: props,
          maxNesting: this.maxNesting - this.iteration,
        })

        return {
          interfaceValue: {
            props: innerTransformer.transform(
              jsonValue,
              type.fieldCollection.fields,
            ),
          },
        }
      }
    }
  }

  jsonValueToPrimitiveValueInput(
    jsonValue: JsonValue,
    type: __PrimitiveTypeFragment,
  ): UpsertValueInput | null {
    if (typeof jsonValue === 'undefined' || jsonValue == null) {
      return null
    }

    switch (type.primitiveKind) {
      case PrimitiveKind.String:
        return { stringValue: { value: jsonValue.toString() } }

      case PrimitiveKind.Integer:
        switch (typeof jsonValue) {
          case 'number':
            return { intValue: { value: jsonValue } }
          case 'string':
            return { intValue: { value: parseInt(jsonValue) } }
          default:
            throw new Error(
              `Cannot convert ${typeof jsonValue} value to an integer`,
            )
        }

      case PrimitiveKind.Float:
        switch (typeof jsonValue) {
          case 'number':
            return { floatValue: { value: jsonValue } }
          case 'string':
            return { floatValue: { value: parseFloat(jsonValue) } }
          default:
            throw new Error(
              `Cannot convert ${typeof jsonValue} value to a float`,
            )
        }

      case PrimitiveKind.Boolean:
        return { booleanValue: { value: !!jsonValue } }
      default:
        throw new Error(`Unrecognized primitive kind ${type.primitiveKind}`)
    }
  }
}
