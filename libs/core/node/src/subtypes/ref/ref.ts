import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import {
  NodeTypeEnum,
  RefNodeI,
  RefNodeO,
} from '@codelab/shared/interface/node'
import { nodeID } from '../../codec/node--id'

export const refNode: t.Type<RefNodeI, RefNodeO> = t.intersection([
  t.type({
    id: nodeID,
    // nodeType: createEnumType<NodeType>(NodeType, 'NodeType'),
    nodeType: t.literal(NodeTypeEnum.Ref),
  }),
  t.partial({
    props: withFallback(t.object, {}),
    parentRef: nodeID,
    childrenRef: t.array(nodeID),
  }),
])
