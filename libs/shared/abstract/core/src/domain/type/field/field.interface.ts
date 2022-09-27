import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../../service'
import { IFieldProps, IValidationSchema } from '../field.dto.interface'
import type { IAnyType } from '../types'

export interface IField<T extends IAnyType = IAnyType>
  extends ICacheService<IFieldProps, IField> {
  id: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<T>
  validationSchema: IValidationSchema
}

export type IFieldRef = string
