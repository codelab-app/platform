import { Props } from '@codelab/shared/interface'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { NodeID, NodeTypeEnum, WithNodeType } from '../../codec/Node--type.i'

export interface ReactNodeI<P extends Props = any> extends WithNodeType {
  type: string
  nodeType: 'React'
  props?: P
  children?: Array<ReactNodeI<P>>
}

export interface ReactNodeA<P extends Props = any> extends WithNodeType {
  id: NodeID
  type: string
  nodeType: 'React'
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
