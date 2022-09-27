import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IField, IFieldRef } from './field'
import { FieldFragment } from './fragments'
import { IInterfaceTypeRef } from './types'

export enum GeneralValidationRules {
  Nullable = 'nullable',
}

export enum StringValidationRules {
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Pattern = 'pattern',
}

export enum NumberValidationRules {
  Maximum = 'maximum',
  Minimum = 'minimum',
  ExclusiveMaximum = 'exclusiveMaximum',
  ExclusiveMinimum = 'exclusiveMinimum',
  MultipleOf = 'multipleOf',
}

export interface IGeneralValidationRules {
  [GeneralValidationRules.Nullable]: boolean
}

export interface IStringValidationRules {
  [StringValidationRules.MinLength]?: Nullish<number>
  [StringValidationRules.MaxLength]?: Nullish<number>
  [StringValidationRules.Pattern]?: Nullish<string>
}

export interface INumberValidationRules {
  [NumberValidationRules.Minimum]?: Nullish<number>
  [NumberValidationRules.Maximum]?: Nullish<number>
  [NumberValidationRules.ExclusiveMinimum]?: Nullish<number>
  [NumberValidationRules.ExclusiveMaximum]?: Nullish<number>
  [NumberValidationRules.MultipleOf]?: Nullish<number>
}

export interface IValidationRules {
  general: IGeneralValidationRules
  string?: Nullish<IStringValidationRules>
  float?: Nullish<INumberValidationRules>
  integer?: Nullish<INumberValidationRules>
}

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name?: Nullish<string>
  description?: Nullish<string>
  validationRules: IValidationRules
  // Type of field specified by an interface id
  fieldType: IInterfaceTypeRef
}

export type IUpdateFieldDTO = ICreateFieldDTO

export interface IDeleteFieldDTO {
  id: IFieldRef
}

/**
 * Props imply as input for something, in this case a model
 */
export type IFieldProps = FieldFragment

export type IFieldDTO = Omit<IField, 'writeCache'>

export type IFieldExport = OGM_TYPES.Field
