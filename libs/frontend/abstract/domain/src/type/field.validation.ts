import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { Nullish } from '@codelab/shared/abstract/types'

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
