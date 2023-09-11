import { IDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IBaseTypeDTO } from './base-type.dto.interface'

/**
 * This approach collapses the types
 */
// export const IAnyType = Type.Union(
//   ObjectTyped.keys(ITypeKind).map((key) =>
//     IBaseTypeDTO<TLiteral<typeof key>>(Type.Literal(key)),
//   ),
// )

export const IAnyBaseType = Type.Union([
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ActionType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.AppType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ArrayType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.CodeMirrorType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ElementType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.EnumType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.InterfaceType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.LambdaType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PageType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.PrimitiveType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.ReactNodeType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.RenderPropType}`)),
  IBaseTypeDTO(Type.Literal(`${ITypeKind.UnionType}`)),
])

export type IAnyBaseType = Static<typeof IAnyBaseType>

/**
 * Entity
 */
export const ITypeEntity = Type.Union([
  IDiscriminatedEntity(`${ITypeKind.ActionType}`),
  IDiscriminatedEntity(`${ITypeKind.AppType}`),
  IDiscriminatedEntity(`${ITypeKind.ArrayType}`),
  IDiscriminatedEntity(`${ITypeKind.CodeMirrorType}`),
  IDiscriminatedEntity(`${ITypeKind.ElementType}`),
  IDiscriminatedEntity(`${ITypeKind.EnumType}`),
  IDiscriminatedEntity(`${ITypeKind.InterfaceType}`),
  IDiscriminatedEntity(`${ITypeKind.LambdaType}`),
  IDiscriminatedEntity(`${ITypeKind.PageType}`),
  IDiscriminatedEntity(`${ITypeKind.PrimitiveType}`),
  IDiscriminatedEntity(`${ITypeKind.ReactNodeType}`),
  IDiscriminatedEntity(`${ITypeKind.RenderPropType}`),
  IDiscriminatedEntity(`${ITypeKind.UnionType}`),
])

export type ITypeEntity = Static<typeof ITypeEntity>
