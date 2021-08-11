import { TypeKind } from '@codelab/ddd/types'
import { ArrayTypeProperties } from './array'
import { EnumTypeProperties } from './enum'
import { InterfaceTypeProperties } from './interface'
import { PrimitiveTypeProperties } from './primitive'

export type TypePropertiesUnion =
  | EnumTypeProperties
  | PrimitiveTypeProperties
  | InterfaceTypeProperties
  | ArrayTypeProperties

export interface TypeValueProperties<P extends TypePropertiesUnion> {
  kind: `${TypeKind}`
  props: P
}
