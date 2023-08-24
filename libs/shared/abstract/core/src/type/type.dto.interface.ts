import type { IDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IActionTypeDTO } from './action-type.dto.interface'
import { IAppTypeDTO } from './app-type.dto.interface'
import { IArrayTypeDTO } from './array-type.dto.interface'
import { IBaseTypeDTO } from './base-type.dto.interface'
import { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'
import { IElementTypeDTO } from './element-type.dto.interface'
import { IEnumTypeDTO } from './enum-type.dto.interface'
import { IInterfaceTypeDTO } from './interface-type.dto.interface'
import { ILambdaTypeDTO } from './lambda-type.dto.interface'
import { IPageTypeDTO } from './page-type.dto.interface'
import { IPrimitiveTypeDTO } from './primitive-type.dto.interface'
import { IReactNodeTypeDTO } from './react-node-type.dto.interface'
import { IRenderPropTypeDTO } from './render-prop-type.dto.interface'
import { IUnionTypeDTO } from './union-type.dto.interface'

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

export const ITypeDTO = Type.Union([
  IActionTypeDTO,
  IAppTypeDTO,
  IArrayTypeDTO,
  ICodeMirrorTypeDTO,
  IElementTypeDTO,
  IEnumTypeDTO,
  IInterfaceTypeDTO,
  ILambdaTypeDTO,
  IPageTypeDTO,
  IPrimitiveTypeDTO,
  IReactNodeTypeDTO,
  IRenderPropTypeDTO,
  IUnionTypeDTO,
])

export type ITypeDTO = Static<typeof ITypeDTO>

export type ITypeEntity =
  | IDiscriminatedEntity<`${ITypeKind.ActionType}`>
  | IDiscriminatedEntity<`${ITypeKind.AppType}`>
  | IDiscriminatedEntity<`${ITypeKind.ArrayType}`>
  | IDiscriminatedEntity<`${ITypeKind.CodeMirrorType}`>
  | IDiscriminatedEntity<`${ITypeKind.ElementType}`>
  | IDiscriminatedEntity<`${ITypeKind.EnumType}`>
  | IDiscriminatedEntity<`${ITypeKind.InterfaceType}`>
  | IDiscriminatedEntity<`${ITypeKind.LambdaType}`>
  | IDiscriminatedEntity<`${ITypeKind.PageType}`>
  | IDiscriminatedEntity<`${ITypeKind.PrimitiveType}`>
  | IDiscriminatedEntity<`${ITypeKind.ReactNodeType}`>
  | IDiscriminatedEntity<`${ITypeKind.RenderPropType}`>
  | IDiscriminatedEntity<`${ITypeKind.UnionType}`>
