import type { Nullish } from '@codelab/shared/abstract/types'
import type { ITypeRef } from '../type'
import type { IFieldDefaultValue, IFieldRef } from './field.model.interface'
import type { IValidationRules } from './field.validation'

export interface ICreateFieldData {
  defaultValues?: Nullish<IFieldDefaultValue>
  description?: Nullish<string>
  // Type of field specified by a type id
  // TODO: Refactor fieldType to take in `{ id: string }`
  fieldType: ITypeRef
  id: IFieldRef
  interfaceTypeId: string
  key: string
  name?: Nullish<string>
  validationRules?: Nullish<IValidationRules>
}

export type IUpdateFieldData = ICreateFieldData
