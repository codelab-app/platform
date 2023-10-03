import type { Nullish } from '@codelab/shared/abstract/types'
import type { IFieldDefaultValue, IFieldRef } from './field'
import type { IValidationRules } from './field.validation'
import type { IInterfaceTypeRef, ITypeRef } from './types'

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
  validationRules?: Nullish<IValidationRules>
}

export type IUpdateFieldData = ICreateFieldData
