import {
  __FieldFragment,
  __PropFragment,
  __PropValueFragment,
  __SimpleTypeFragment,
  __TypeFragment,
  PrimitiveType,
  UpsertPropsInput,
  UpsertValueInput,
} from '@codelab/codegen/graphql'
import { PrimitivePropValue, PropModel } from './PropsJsonModelAdaptor'

export class JsonModelUpsertValueAdaptor {
  private _typesById: Map<string, __TypeFragment>

  private _propsById: Map<string, __PropFragment>

  private _valuesById: Map<string, __PropValueFragment>

  private propsByFieldId: Map<string, __PropFragment>

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

  constructor(
    private types: Array<__TypeFragment>,
    private values?: Array<__PropValueFragment>,
    private props?: Array<__PropFragment>,
  ) {
    this._typesById = new Map(types.map((type) => [type.id, type]))
    this._propsById = new Map(
      props?.map((innerProp) => [innerProp.id, innerProp]) || [],
    )
    this._valuesById = new Map(values?.map((value) => [value.id, value]) || [])

    this.propsByFieldId = new Map(
      props?.map((innerProp) => [innerProp.field.id, innerProp]) || [],
    )
  }

  convert(
    jsonModel: PropModel,
    fields: Array<__FieldFragment>,
    iteration = 0,
  ): Array<Pick<UpsertPropsInput, 'value' | 'fieldId' | 'propId'>> {
    const inputs: Array<
      Pick<UpsertPropsInput, 'value' | 'fieldId' | 'propId'>
    > = []

    // Go through each field of the interface

    for (const field of fields) {
      // Get the value from the jsonModel that matches this key
      const jsonModelValue = jsonModel[field.key]
      const initialProp = this.getPropByFieldId(field.id)

      // Create a value input based of it
      const valueInput = this.jsonValueToValueInput(
        jsonModelValue,
        field.typeId,
        field.id,
        initialProp,
        iteration,
      )

      inputs.push({
        fieldId: field.id,
        value: valueInput,
        propId: initialProp?.id,
      })
    }

    return inputs
  }

  jsonValueToValueInput(
    jsonValue: PrimitivePropValue,
    typeId: string,
    fieldId: string,
    initialProps?: __PropFragment,
    iteration = 0,
  ): UpsertValueInput | null {
    if (typeof jsonValue === 'undefined' || jsonValue == null) {
      return null
    }

    if (iteration > 100) {
      throw new Error('Value too nested')
    }

    const type = this.getType(typeId)

    if (!type) {
      throw new Error(`Type with id ${typeId} not found`)
    }

    switch (type.__typename) {
      case 'SimpleType':
        return JsonModelUpsertValueAdaptor.jsonValueToPrimitiveValueInput(
          jsonValue,
          type,
        )
      case 'ArrayType':
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
                  iteration + 1,
                ),
              )
              .filter((v): v is UpsertValueInput => !!v),
          },
        }
      case 'EnumType':
        return {
          stringValue: { value: jsonValue?.toString() || '' },
        }

      case 'Interface': {
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

        const adaptor = new JsonModelUpsertValueAdaptor(
          this.types,
          this.values,
          props,
        )

        return {
          interfaceValue: {
            props: adaptor.convert(
              jsonValue,
              type.fieldCollection.fields,
              iteration + 1,
            ),
          },
        }
      }
    }
  }

  static jsonValueToPrimitiveValueInput(
    jsonValue: PrimitivePropValue,
    type: __SimpleTypeFragment,
  ): UpsertValueInput | null {
    if (typeof jsonValue === 'undefined' || jsonValue == null) {
      return null
    }

    switch (type.primitiveType) {
      case PrimitiveType.String:
        return { stringValue: { value: jsonValue.toString() } }

      case PrimitiveType.Integer:
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

      case PrimitiveType.Float:
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

      case PrimitiveType.Boolean:
        return { booleanValue: { value: !!jsonValue } }
      default:
        throw new Error(`Unrecognized primitive type ${type.primitiveType}`)
    }
  }
}
