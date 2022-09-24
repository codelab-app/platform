import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { IField, IFieldRef } from './field'
import { FieldFragment } from './fragments'
import { IInterfaceTypeRef } from './types'

interface generalValidationRules {
  nullable?: Nullish<boolean>
}

interface StringValidationRules {
  minLength?: Nullish<number>
  maxLength?: Nullish<number>
  pattern?: Nullish<string>
}

interface IntegerValidationRules {
  maximum?: Nullish<number>
  minimum?: Nullish<number>
  exclusiveMaximum?: Nullish<number>
  exclusiveMinimum?: Nullish<number>
  multipleOf?: Nullish<number>
}

type FloatValidationRules = IntegerValidationRules

export interface ICreateFieldDTO {
  id: IFieldRef
  key: string
  name?: Nullish<string>
  description?: Nullish<string>
  generalValidationRules?: Nullish<generalValidationRules>
  stringValidationRules?: Nullish<StringValidationRules>
  integerValidationRules?: Nullish<IntegerValidationRules>
  floatValidationRules?: Nullish<FloatValidationRules>
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
