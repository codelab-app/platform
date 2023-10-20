import type {
  IBaseType,
  IBaseTypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { ICacheService } from '../../shared'
import type { IModel } from '../../shared/models/model.interface'
import type { IActionTypeModel } from './action-type.model.interface'
import type { IAppTypeModel } from './app-type.model.interface'
import type { IArrayTypeModel } from './array-type.model.interface'
import type { ICodeMirrorTypeModel } from './code-mirror-type.model.interface'
import type { IElementTypeModel } from './element-type.model.interface'
import type { IEnumType } from './enum-type.interface'
import type { IInterfaceTypeModel } from './interface-type.model.interface'
import type { ILambdaTypeModel } from './lambda-type.model.interface'
import type { IPageTypeModel } from './page-type.model.interface'
import type { IPrimitiveTypeModel } from './primitive-type.model.interface'
import type { IReactNodeTypeModel } from './react-node-type.model.interface'
import type { IRenderPropTypeModel } from './render-prop-type.model.interface'
import type { IUnionTypeModel } from './union-type.model.interface'

export interface IBaseTypeModel<
  DTO extends IBaseTypeDTO,
  CreateInput,
  UpdateInput,
> extends Omit<
      IModel<CreateInput, UpdateInput, void, IBaseType>,
      'toDeleteInput'
    >,
    ICacheService<DTO, IBaseTypeModel<DTO, CreateInput, UpdateInput>> {
  __typename?: `${ITypeKind}`
  kind: ITypeKind
  name: string
}

export type ITypeModel =
  | IActionTypeModel
  | IAppTypeModel
  | IArrayTypeModel
  | ICodeMirrorTypeModel
  | IElementTypeModel
  | IEnumType
  | IInterfaceTypeModel
  | ILambdaTypeModel
  | IPageTypeModel
  | IPrimitiveTypeModel
  | IReactNodeTypeModel
  | IRenderPropTypeModel
  | IUnionTypeModel

export type ITypeRef = string

export type ITypeOf<TKind extends ITypeKind> = ITypeModel extends {
  typeKind: TKind
}
  ? ITypeModel
  : never
