import { ArrayTypeProperties, ArrayTypeValueObject } from './array'
import { EnumTypeProperties, EnumTypeValueObject } from './enum'
import { InterfaceTypeProperties, InterfaceTypeValueObject } from './interface'
import { PrimitiveTypeProperties, PrimitiveTypeValueObject } from './primitive'
import { TypePropertiesUnion, TypeValueProperties } from './type.interface'
import { TypeValueObject } from './type.vo'

export abstract class TypeFactory {
  static create({
    kind,
    props,
  }: TypeValueProperties<TypePropertiesUnion>): TypeValueObject<TypePropertiesUnion> {
    switch (kind) {
      case 'PrimitiveType':
        return new PrimitiveTypeValueObject({
          kind,
          props: props as PrimitiveTypeProperties,
        })
      case 'EnumType':
        return new EnumTypeValueObject({
          kind,
          props: props as EnumTypeProperties,
        })
      case 'ArrayType':
        return new ArrayTypeValueObject({
          kind,
          props: props as ArrayTypeProperties,
        })
      case 'InterfaceType':
        return new InterfaceTypeValueObject({
          kind,
          props: props as InterfaceTypeProperties,
        })
      default:
        throw new Error(`Invalid kind ${kind}`)
    }
  }
}
