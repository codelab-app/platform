import { Props } from '@codelab/props'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { NodeID, NodeTypeEnum, WithNodeType } from './Node--type.i'

export interface ReactNodeI<P extends Props = any> extends WithNodeType {
  type: string
  props?: P
  children?: Array<ReactNodeI<P>>
}

export interface ReactNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  type: string
  props: P
  children: Array<ReactNodeA<P>>
}

export const reactNode: t.Type<ReactNodeI> = t.recursion('ReactNode', (self) =>
  t.intersection([
    t.type({
      nodeType: t.union([
        t.literal(NodeTypeEnum.React),
        t.literal(NodeTypeEnum.Tree),
        t.literal(NodeTypeEnum.Ref),
      ]),
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
