import { Vertex } from '@codelab/shared/abstract/core'
import { ElementTypeKind, PrimitiveKind, TypeKind } from '@codelab/shared/enums'

/**
 * The interface required by TypeTree to function
 *
 * Keeping the port interfaces here allows us to use this in both
 * frontend (with fragments) and backend (with entities or models)
 */
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
