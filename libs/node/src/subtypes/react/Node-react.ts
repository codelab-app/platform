import { Props } from '@codelab/props'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { NodeTypeEnum, NodeID, WithNodeType } from '../../codec/Node--type.i'

export interface ReactNodeI<P extends Props = any> extends WithNodeType {
  type: string
  nodeType: NodeTypeEnum.React
  props?: P
  children?: Array<ReactNodeI<P>>
}

export interface ReactNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  type: string
  nodeType: NodeTypeEnum.React
  props: P
  children: Array<ReactNodeA<P>>
}

export const reactNode: t.Type<ReactNodeI> = t.recursion('ReactNode', (self) =>
  t.intersection([
    t.type({
      nodeType: t.literal(NodeTypeEnum.React),
      type: t.string,
    }),
    t.partial({
      // TODO withFallback uuid
      // https://github.com/gcanti/io-ts-types/issues/103
      id: t.string,
      props: withFallback(t.object, {}),
      children: t.array(self),
    }),
  ]),
)

export const isReactNode = (node: any): node is ReactNodeI => {
  return node.nodeType === NodeTypeEnum.React && node.type
}
