import type {
  IBaseTypeDto,
  IFieldDefaultValue,
  IPropData,
  ITypeKind,
  IValidationRules,
} from '@codelab/shared-abstract-core'
import type {
  Nullable,
  Nullish,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import type { Ref } from 'mobx-keystone'

import type { IComponentModel } from '../../component'
import type { IElementModel } from '../../element'
import type { IModel } from '../../shared'
import type { IStoreModel } from '../../store'
import type { IUserModel } from '../../user'
import type { IActionTypeModel } from './action-type.model.interface'
import type { IAppTypeModel } from './app-type.model.interface'
import type { IArrayTypeModel } from './array-type.model.interface'
import type { ICodeMirrorTypeModel } from './code-mirror-type.model.interface'
import type { IElementTypeModel } from './element-type.model.interface'
import type { IEnumTypeModel } from './enum-type.model.interface'
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
  discriminator?: ObjectLike
  help?: Nullable<string>
  isPropComponent?: boolean
  label?: string
  oneOf?: Array<JsonSchema>
  properties?:
    | {
        [key: string]: JSONSchema7Definition & {
          label?: Nullable<string>
          autocomplete?: IPropData
          uniforms?: ObjectLike
        }
      }
    | undefined
  uniforms?: ObjectLike
}

export interface ITypeTransformContext {
  component?: IComponentModel
  defaultValues?: Nullish<IFieldDefaultValue>
  depth?: number
  element?: IElementModel
  providerStore?: IStoreModel
  store?: IStoreModel
  validationRules?: Nullish<IValidationRules>
}

export interface IBaseTypeModel<IDto extends IBaseTypeDto>
  extends IModel<IDto, IBaseTypeModel<IDto>> {
  __typename: `${ITypeKind}`
  id: string
  kind: ITypeKind
  name: string
  owner: Ref<IUserModel>
  toJsonSchema(context: ITypeTransformContext): JsonSchema
  writeCache(dto: Partial<IDto>): IBaseTypeModel<IDto>
}

export type ITypeModel =
  | IActionTypeModel
  | IAppTypeModel
  | IArrayTypeModel
  | ICodeMirrorTypeModel
  | IElementTypeModel
  | IEnumTypeModel
  | IInterfaceTypeModel
  | ILambdaTypeModel
  | IPageTypeModel
  | IPrimitiveTypeModel
  | IReactNodeTypeModel
  | IRenderPropTypeModel
  | IRichTextTypeModel
  | IUnionTypeModel
