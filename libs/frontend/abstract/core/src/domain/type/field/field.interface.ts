import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../../service'
import type { IFieldDTO, IValidationRules } from '../field.dto.interface'
import type { IAnyType, IInterfaceType } from '../types'

export type IFieldDefaultValue = object | string | number | boolean
export interface IField<T extends IAnyType = IAnyType>
  extends ICacheService<IFieldDTO, IField> {
  id: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<T>
  validationRules: Nullish<IValidationRules>
  defaultValues: Nullish<IFieldDefaultValue>
  api: Ref<IInterfaceType>
}

export type IFieldRef = string
