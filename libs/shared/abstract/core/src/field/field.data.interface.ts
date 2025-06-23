import type { Nullish } from '@codelab/shared-abstract-types'

import type { IFieldRef } from './field.dto.interface'
import type { IValidationRules } from './field.validation'

export interface IFieldRouteCreateData {
  interfaceTypeId: string
}

export interface IFieldCreateData {
  defaultValues?: Nullish<IFieldDefaultValue>
  description?: Nullish<string>
  // Type of field specified by a type id
  // TODO: Refactor fieldType to take in `{ id: string }`
  fieldType: string
  id: IFieldRef
  interfaceTypeId: string
  key: string
  name?: Nullish<string>
  prevSibling?: Nullish<{ id: IFieldRef }>
  validationRules?: Nullish<IValidationRules>
}

export type IFieldUpdateData = IFieldCreateData

export type IFieldDefaultValue =
  | boolean
  | number
  | string
  | Array<IFieldDefaultValue>
  | { [x: string]: IFieldDefaultValue }
