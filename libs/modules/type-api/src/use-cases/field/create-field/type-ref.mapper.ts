import { TypeUnionRef } from '@codelab/codegen/dgraph'
import { CreateFieldInput } from './create-field.input'
import { MAX_ARRAY_DEPTH } from './create-field.service'

export class TypeRefMapper {
  map(
    {
      enumType,
      arrayType,
      simpleType,
      interfaceType,
    }: CreateFieldInput['type'],
    iteration = 0,
  ): TypeUnionRef {
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
      interfaceRef: interfaceType
        ? { id: interfaceType.interfaceId }
        : undefined,
    }
  }
}
