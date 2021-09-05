import { ElementTypeKind, PrimitiveKind, TypeKind } from '../enums'
import { Vertex } from '../graph/vertex'

export type ITypeVertex =
  | IArrayTypeVertex
  | IComponentTypeVertex
  | IElementTypeVertex
  | IEnumTypeVertex
  | IInterfaceTypeVertex
  | ILambdaTypeVertex
  | IPrimitiveTypeVertex

export interface IBaseTypeVertex extends Vertex {
  name: string
  typeKind: TypeKind
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
