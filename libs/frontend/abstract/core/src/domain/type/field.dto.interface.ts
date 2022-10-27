import { OGM_TYPES } from '@codelab/backend/abstract/codegen'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IFieldDefaultValue, IFieldRef } from './field'
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
  [GeneralValidationRules.Nullable]?: Nullish<boolean>
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
  general?: Nullish<IGeneralValidationRules>
  [PrimitiveTypeKind.String]?: Nullish<IStringValidationRules>
  [PrimitiveTypeKind.Float]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.Integer]?: Nullish<INumberValidationRules>
}

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name?: Nullish<string>
  description?: Nullish<string>
  validationRules?: Nullish<IValidationRules>
  // Type of field specified by an interface id
  fieldType: IInterfaceTypeRef
  interfaceTypeId: IInterfaceTypeRef
  defaultValues: Nullish<IFieldDefaultValue>
}

export type IUpdateFieldDTO = ICreateFieldDTO

export interface IDeleteFieldDTO {
  id: IFieldRef
}

/**
 * Props imply as input for something, in this case a model
 */
export type IFieldDTO = FieldFragment

export type IFieldExport = OGM_TYPES.Field
