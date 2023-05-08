import type { ITypeKind } from '../type-kind.enum'
import type { IOwner } from '../user.interface'
import type { IActionTypeDTO } from './action-type.dto.interface'
import type { IAppTypeDTO } from './app-type.dto.interface'
import type { IArrayTypeDTO } from './array-type.dto.interface'
import type { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'
import type { IElementTypeDTO } from './element-type.dto.interface'
import type { IEnumTypeDTO } from './enum-type.dto.interface'
import type { IInterfaceTypeDTO } from './interface-type.dto.interface'
import type { ILambdaTypeDTO } from './lambda-type.dto.interface'
import type { IPageTypeDTO } from './page-type.dto.interface'
import type { IPrimitiveTypeDTO } from './primitive-type.dto.interface'
import type { IReactNodeTypeDTO } from './react-node-type.dto.interface'
import type { IRenderPropTypeDTO } from './render-prop-type.dto.interface'
import type { IUnionTypeDTO } from './union-type.dto.interface'

export interface IBaseTypeDTO extends IOwner {
  id: string
  kind: ITypeKind
  name: string
}

export type ITypeDTO =
  | IActionTypeDTO
  | IAppTypeDTO
  | IArrayTypeDTO
  | ICodeMirrorTypeDTO
  | IElementTypeDTO
  | IEnumTypeDTO
  | IInterfaceTypeDTO
  | ILambdaTypeDTO
  | IPageTypeDTO
  | IPrimitiveTypeDTO
  | IReactNodeTypeDTO
  | IRenderPropTypeDTO
  | IUnionTypeDTO
