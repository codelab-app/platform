import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import type { IAnyType } from '../types'

export interface IField {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<IAnyType>
}

export type IFieldRef = string
