import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { NodeTypeEnum, ReactNodeI } from '@codelab/shared/interface/node'

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
