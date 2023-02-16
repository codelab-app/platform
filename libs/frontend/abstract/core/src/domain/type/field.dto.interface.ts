import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { IFieldDefaultValue, IFieldRef } from './field'
import type { FieldPreviewFragment } from './fragments'
import type { IInterfaceTypeRef, ITypeRef } from './types'

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
  [PrimitiveTypeKind.Number]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.Integer]?: Nullish<INumberValidationRules>
}

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name?: Nullish<string>
  description?: Nullish<string>
  validationRules?: Nullish<IValidationRules>
  // Type of field specified by a type id
  // TODO: Refactor fieldType to take in `{ id: string }`
  fieldType: ITypeRef
  // fieldType: {
  //   id: ITypeRef
  // }
  interfaceTypeId: IInterfaceTypeRef
  defaultValues?: Nullish<IFieldDefaultValue>
}

export type IUpdateFieldDTO = ICreateFieldDTO

/**
 * Props imply as input for something, in this case a model
 */
export type IFieldDTO = FieldPreviewFragment
