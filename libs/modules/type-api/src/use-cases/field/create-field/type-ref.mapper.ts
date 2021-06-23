import { TypeRef, Unit } from '@codelab/codegen/dgraph'
import { CreateFieldInput } from './create-field.input'
import { MAX_ARRAY_DEPTH } from './create-field.service'

export class TypeRefMapper {
  map(
    {
      enumType,
      arrayType,
      unitType,
      simpleType,
      interfaceType,
    }: CreateFieldInput['type'],
    iteration = 0,
  ): TypeRef {
    if (iteration > MAX_ARRAY_DEPTH) {
      throw new Error('Type too nested')
    }

    return {
      arrayTypeRef: arrayType
        ? {
            type: this.map(arrayType.type, iteration + 1),
          }
        : undefined,
      simpleTypeRef: simpleType
        ? { primitiveType: simpleType.primitiveType }
        : undefined,
      enumTypeRef: enumType
        ? { allowedValues: enumType.allowedValues.map((v) => ({ name: v })) }
        : undefined,
      unitTypeRef: unitType
        ? {
            allowedUnits: unitType.allowedUnits
              ? unitType.allowedUnits
              : Object.values(Unit),
          }
        : undefined,
      interfaceRef: interfaceType
        ? { id: interfaceType.interfaceId }
        : undefined,
    }
  }
}
