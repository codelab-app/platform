import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../../service'
import { IProp } from '../../prop'
import { IFieldDTO, IValidationRules } from '../field.dto.interface'
import type { IAnyType } from '../types'

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
  defaultValues: Nullish<Ref<IProp>>
}

export type IFieldRef = string
