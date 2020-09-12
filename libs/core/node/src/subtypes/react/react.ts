import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { ReactNodeI, NodeReactTypeEnum } from '@codelab/shared/interface/node'

// export const reactNodeTypeLiterals = t.union([t.literal('Button'), t.literal('Table')])

export const reactNodeTypeLiterals = t.union(
  Object.values(NodeReactTypeEnum).map((key: string) => {
    return t.literal(key)
  }) as any,
)

export const reactNode: t.Type<ReactNodeI> = t.recursion('ReactNode', (self) =>
  t.intersection([
    t.type({
      nodeType: t.literal('React'),
      type: reactNodeTypeLiterals,
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
