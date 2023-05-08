import type {
  IBaseTypeDTO,
  IOwner,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../../service'
import type { IModel } from '../../model.interface'
import type { IActionType } from './action-type.interface'
import type { IAppType } from './app-type.interface'
import type { IArrayType } from './array-type.interface'
import type { ICodeMirrorType } from './code-mirror-type.interface'
import type { IElementType } from './element-type.interface'
import type { IEnumType } from './enum-type.interface'
import type { IInterfaceType } from './interface-type.interface'
import type { ILambdaType } from './lambda-type.interface'
import type { IPageType } from './page-type.interface'
import type { IPrimitiveType } from './primitive-type.interface'
import type { IReactNodeType } from './react-node-type.interface'
import type { IRenderPropType } from './render-prop-type.interface'
import type { IUnionType } from './union-type.interface'

export interface IBaseType<DTO extends IBaseTypeDTO, CreateInput, UpdateInput>
  extends Omit<IModel<CreateInput, UpdateInput, void>, 'toDeleteInput'>,
    ICacheService<DTO, IBaseType<DTO, CreateInput, UpdateInput>>,
    IOwner {
  id: string
  kind: ITypeKind
  name: string
}

export type IType =
  | IActionType
  | IAppType
  | IArrayType
  | ICodeMirrorType
  | IElementType
  | IEnumType
  | IInterfaceType
  | ILambdaType
  | IPageType
  | IPrimitiveType
  | IReactNodeType
  | IRenderPropType
  | IUnionType

export type ITypeRef = string

export type ITypeOf<TKind extends ITypeKind> = IType extends {
  typeKind: TKind
}
  ? IType
  : never
