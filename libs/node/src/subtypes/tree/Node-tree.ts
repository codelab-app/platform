import { Props } from '@codelab/props'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { nodeID } from '../../codec/Node--id'
import { NodeID, NodeTypeEnum, WithNodeType } from '../../codec/Node--type.i'

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

export const treeNode: RecursiveTreeNode = t.recursion(
  'TreeNodeInput',
  (self) =>
    t.intersection([
      t.type({
        id: nodeID,
        nodeType: withFallback(
          t.union([
            t.literal(NodeTypeEnum.React),
            t.literal(NodeTypeEnum.Tree),
            t.literal(NodeTypeEnum.Ref),
          ]),
          NodeTypeEnum.Tree,
        ),
      }),
      t.partial({
        type: withFallback(t.string, undefined),
        props: withFallback(t.object, {}),
        children: t.array(self),
      }),
    ]),
)

type RecursiveTreeNode = t.RecursiveType<t.Type<TreeNodeI, TreeNodeO>>
