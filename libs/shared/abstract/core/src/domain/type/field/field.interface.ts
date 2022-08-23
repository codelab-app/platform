import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import type { IAnyType } from '../types'

export interface IField<T extends IAnyType = IAnyType> {
  id: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<T>
}

export type IFieldRef = string
