import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { IFieldDefaultValue, IFieldRef } from './field'
import type { IInterfaceTypeRef, ITypeRef } from './types'

export enum GeneralValidationRules {
  Nullable = 'nullable',
}

export enum StringValidationRules {
  MaxLength = 'maxLength',
  MinLength = 'minLength',
  Pattern = 'pattern',
}

export enum NumberValidationRules {
  ExclusiveMaximum = 'exclusiveMaximum',
  ExclusiveMinimum = 'exclusiveMinimum',
  Maximum = 'maximum',
  Minimum = 'minimum',
  MultipleOf = 'multipleOf',
}

export interface IGeneralValidationRules {
  [GeneralValidationRules.Nullable]?: Nullish<boolean>
}

export interface IStringValidationRules {
  [StringValidationRules.MaxLength]?: Nullish<number>
  [StringValidationRules.MinLength]?: Nullish<number>
  [StringValidationRules.Pattern]?: Nullish<string>
}

export interface INumberValidationRules {
  [NumberValidationRules.ExclusiveMaximum]?: Nullish<number>
  [NumberValidationRules.ExclusiveMinimum]?: Nullish<number>
  [NumberValidationRules.Maximum]?: Nullish<number>
  [NumberValidationRules.Minimum]?: Nullish<number>
  [NumberValidationRules.MultipleOf]?: Nullish<number>
}

export interface IValidationRules {
  [PrimitiveTypeKind.Integer]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.Number]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.String]?: Nullish<IStringValidationRules>
  general?: Nullish<IGeneralValidationRules>
}

export interface ICreateFieldData {
  defaultValues?: Nullish<IFieldDefaultValue>
  description?: Nullish<string>
  // Type of field specified by a type id
  // TODO: Refactor fieldType to take in `{ id: string }`
  fieldType: ITypeRef
  id: IFieldRef
  interfaceTypeId: IInterfaceTypeRef
  key: string
  name?: Nullish<string>
  nextSibling?: Nullish<IEntity>
  prevSibling?: Nullish<IEntity>
  validationRules?: Nullish<IValidationRules>
}

export type IUpdateFieldData = ICreateFieldData
/**
 * Props imply as input for something, in this case a model
 */
export interface IFieldDTO {
  api: IEntity
  defaultValues?: string | null
  description?: string | null
  fieldType: IEntity
  id: string
  key: string
  name?: string | null
  nextSibling?: IEntity | null
  prevSibling?: IEntity | null
  validationRules?: string | null
}
