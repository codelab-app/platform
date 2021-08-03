import { TypeKind } from '@codelab/ddd/types'
import { ArrayTypeProperties } from './array/array-type.interface'
import { EnumTypeProperties } from './enum/enum-type.vo'
import { InterfaceTypeProperties } from './interface/interface-type.vo'
import { PrimitiveTypeProperties } from './primitive/primitive-type.vo'

export type TypePropertiesUnion =
  | EnumTypeProperties
  | PrimitiveTypeProperties
  | InterfaceTypeProperties
  | ArrayTypeProperties

export interface TypeValueProperties<P extends TypePropertiesUnion> {
  kind: `${TypeKind}`
  props: P
}
