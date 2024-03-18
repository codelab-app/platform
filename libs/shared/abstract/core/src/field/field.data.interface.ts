import type { Nullish } from '@codelab/shared/abstract/types'
import type { IFieldRef } from './field.dto.interface'
import type { IValidationRules } from './field.validation'

export interface ICreateFieldData {
  defaultValues?: Nullish<IFieldDefaultValue>
  description?: Nullish<string>
  // Type of field specified by a type id
  // TODO: Refactor fieldType to take in `{ id: string }`
  fieldType: string
  id: IFieldRef
  interfaceTypeId: string
  key: string
  name?: Nullish<string>
  validationRules?: Nullish<IValidationRules>
}

export type IUpdateFieldData = ICreateFieldData

export type IFieldDefaultValue =
  | Array<IFieldDefaultValue>
  | boolean
  | number
  | string
  | { [x: string]: IFieldDefaultValue }
