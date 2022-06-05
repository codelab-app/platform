import { Nullish } from '@codelab/shared/abstract/types'
import { DataNode } from 'antd/lib/tree'
import { Ref } from 'mobx-keystone'
import type { IAnyType, ITypeKind } from '../types'

export interface IStateNode extends DataNode {
  key: string
  title: Nullish<string>
  type: {
    id: string
    kind: ITypeKind
  }
  interfaceId: string
  children: Array<IStateNode>
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

  antdNode: (interfaceId: string) => IStateNode
}

export type IFieldRef = string
