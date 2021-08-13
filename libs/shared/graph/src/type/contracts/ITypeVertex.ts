import { ElementTypeKind, PrimitiveKind } from '@codelab/ddd/types'
import { IVertex } from '../../IVertex'

export type ITypeVertex =
  | IArrayTypeVertex
  | IComponentTypeVertex
  | IElementTypeVertex
  | IEnumTypeVertex
  | IInterfaceTypeVertex
  | ILambdaTypeVertex
  | IPrimitiveTypeVertex

export interface IBaseTypeVertex extends IVertex {
  name: string
}

export type ILambdaTypeVertex = IBaseTypeVertex

export type IComponentTypeVertex = IBaseTypeVertex

export type IArrayTypeVertex = IBaseTypeVertex

export type IInterfaceTypeVertex = IBaseTypeVertex

export interface IElementTypeVertex extends IBaseTypeVertex {
  kind: ElementTypeKind
}

export interface IPrimitiveTypeVertex extends IBaseTypeVertex {
  primitiveKind: PrimitiveKind
}

export interface IEnumTypeVertex extends IBaseTypeVertex {
  allowedValues: Array<IEnumTypeValue>
}

export interface IEnumTypeValue {
  id: string
  name?: string | null
  value: string
}
