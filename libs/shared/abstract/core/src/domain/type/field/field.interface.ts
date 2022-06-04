import { Nullish } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { Ref } from 'mobx-keystone'
import type { IAnyType } from '../types'

export interface IStateNode extends DataNode {
  key: string
  type: Ref<IAnyType>
}

export interface IField {
  id: string
  /**
   * Allows default to null
   */
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<IAnyType>
}

export type IFieldRef = string
