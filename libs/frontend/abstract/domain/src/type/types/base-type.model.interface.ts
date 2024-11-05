import type {
  IBaseType,
  IBaseTypeDto,
  IFieldDefaultValue,
  IPropData,
  ITypeKind,
  IValidationRules,
} from '@codelab/shared/abstract/core'
import type {
  Nullable,
  Nullish,
  ObjectLike,
} from '@codelab/shared/abstract/types'
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import type { Ref } from 'mobx-keystone'

import type { IModel } from '../../shared'
import type { IUserModel } from '../../user'
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
import type { IRichTextTypeModel } from './rich-text-type.model.interface'
import type { IUnionTypeModel } from './union-type.model.interface'

export interface JsonSchema extends JSONSchema7 {
  autocomplete?: IPropData
  help?: Nullable<string>
  isTypedProp?: boolean
  label?: string
  properties?:
    | {
        [key: string]: JSONSchema7Definition & {
          label?: Nullable<string>
          autocomplete?: IPropData
          uniforms?: ObjectLike
        }
      }
    | undefined
}

export interface ITypeTransformContext {
  defaultValues?: Nullish<IFieldDefaultValue>
  fieldName?: string | null
  validationRules?: Nullish<IValidationRules>
  uniformSchema?(type: ITypeModel): ObjectLike
}
export interface IBaseTypeModel<Dto extends IBaseTypeDto>
  extends IModel<IBaseType, IBaseTypeModel<Dto>> {
  __typename: `${ITypeKind}`
  id: string
  kind: ITypeKind
  name: string
  owner: Ref<IUserModel>
  toJsonSchema(context: ITypeTransformContext): JsonSchema
  writeCache(dto: Partial<Dto>): IBaseTypeModel<Dto>
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
  | IRichTextTypeModel
  | IUnionTypeModel
