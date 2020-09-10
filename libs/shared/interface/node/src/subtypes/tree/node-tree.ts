import { Props } from '@codelab/shared/interface/props'
import * as t from 'io-ts'
import { NodeID, WithNodeType } from '../../node--enum'

/**
 * Parent/child relationship is encoded in the data structure itself, and is used to construct the tree.
 */
export type TreeNodeI<P extends Props = any> = {
  id: NodeID
  children?: Array<TreeNodeI<P>>
} & { [T in keyof P]?: P[T] } &
  WithNodeType

export type TreeNodeA<P extends Props = any> = {
  id: NodeID
  children: Array<TreeNodeA<P>>
} & { [T in keyof P]?: P[T] } &
  WithNodeType

/**
 * Output type of brand is different
 *
 * https://github.com/gcanti/io-ts-codegen/issues/42
 */
export type TreeNodeO<P extends Props = any> = {
  id: string
  children?: Array<TreeNodeI<P>>
} & { [T in keyof P]?: P[T] } &
  WithNodeType

export type RecursiveTreeNode = t.RecursiveType<t.Type<TreeNodeI, TreeNodeO>>
