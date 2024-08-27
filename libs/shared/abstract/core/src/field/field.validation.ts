import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { PrimitiveTypeKind } from '@codelab/shared/infra/gql'

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
  [StringValidationRules.MaxLength]?: Maybe<number>
  [StringValidationRules.MinLength]?: Maybe<number>
  [StringValidationRules.Pattern]?: Maybe<string>
}

export interface INumberValidationRules {
  [NumberValidationRules.ExclusiveMaximum]?: Maybe<number>
  [NumberValidationRules.ExclusiveMinimum]?: Maybe<number>
  [NumberValidationRules.Maximum]?: Maybe<number>
  [NumberValidationRules.Minimum]?: Maybe<number>
  [NumberValidationRules.MultipleOf]?: Maybe<number>
}

export interface IValidationRules {
  [PrimitiveTypeKind.Integer]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.Number]?: Nullish<INumberValidationRules>
  [PrimitiveTypeKind.String]?: Nullish<IStringValidationRules>
  general?: Nullish<IGeneralValidationRules>
}
