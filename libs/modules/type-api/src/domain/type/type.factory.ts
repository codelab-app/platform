import { ArrayTypeProperties } from './array/array-type.interface'
import { ArrayTypeValueObject } from './array/array-type.vo'
import { EnumTypeProperties, EnumTypeValueObject } from './enum/enum-type.vo'
import {
  InterfaceTypeProperties,
  InterfaceTypeValueObject,
} from './interface/interface-type.vo'
import {
  PrimitiveTypeProperties,
  PrimitiveTypeValueObject,
} from './primitive/primitive-type.vo'
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
