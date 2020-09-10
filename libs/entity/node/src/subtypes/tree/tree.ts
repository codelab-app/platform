import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { NodeTypeEnum, RecursiveTreeNode } from '@codelab/shared/interface/node'
import { nodeID } from '../../codec/node--id'

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
