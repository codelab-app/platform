import { IEdge } from '@codelab/shared/abstract/codegen'
import { Nullish } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import type { IAnyType } from '../types/type.interface'

/**
 * Type edge can be:
 * - Interface -> Field relation - IField is used then
 * - Array -> Array Item Type relation - IEdge
 * - Union -> Union Item Type relation - IEdge
 */
export type ITypeEdge = IField | IEdge

export interface IField {
  id: string
  name: Nullish<string>
  description: Nullish<string>
  key: string
  type: Ref<IAnyType>
}
