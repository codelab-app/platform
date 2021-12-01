import { IMonacoType } from '..'
import { IAppType } from '../types/app-type/app-type.interface'
import { IArrayType } from '../types/array-type/array-type.interface'
import { IBaseType } from '../types/base-type/base-type.interface'
import { IComponentType } from '../types/component-type/component-type.interface'
import { IElementType } from '../types/element-type/element-type.interface'
import { IEnumTypeValue } from '../types/enum-type/enum-type.interface'
import { IInterfaceType } from '../types/interface-type/interface-type.interface'
import { ILambdaType } from '../types/lambda-type/lambda-type.interface'
import { IPageType } from '../types/page-type/page-type.interface'
import { IPrimitiveType } from '../types/primitive-type/primitive-type.interface'

export type ITypeVertexInput =
  | IArrayTypeInput
  | IComponentTypeInput
  | IElementTypeInput
  | IEnumTypeInput
  | IInterfaceTypeInput
  | ILambdaTypeInput
  | IPageTypeInput
  | IAppTypeInput
  | IPrimitiveTypeInput
  | IMonacoTypeInput

export type IBaseTypeInput = Omit<IBaseType, 'id'>

export type ILambdaTypeInput = Omit<ILambdaType, 'id'>

export type IPageTypeInput = Omit<IPageType, 'id'>

export type IAppTypeInput = Omit<IAppType, 'id'>

export type IMonacoTypeInput = Omit<IMonacoType, 'id'>

export type IComponentTypeInput = Omit<IComponentType, 'id'>

export type IArrayTypeInput = Omit<IArrayType, 'id'>

export type IInterfaceTypeInput = Omit<IInterfaceType, 'id'>

export type IElementTypeInput = Omit<IElementType, 'id'>

export type IPrimitiveTypeInput = Omit<IPrimitiveType, 'id'>

export interface IEnumTypeInput extends IBaseTypeInput {
  allowedValues: Array<IEnumTypeValueInput>
}

export type IEnumTypeValueInput = Omit<IEnumTypeValue, 'id'>
