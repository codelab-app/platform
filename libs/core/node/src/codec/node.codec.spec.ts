import { decode } from '@codelab/shared/common'
import * as t from 'io-ts'
import { withFallback } from 'io-ts-types/lib/withFallback'

describe('Node Codec', () => {
  it('sets a default value', () => {
    interface Product {
      id?: string
      name: string
    }

    const product: t.Type<Product> = t.intersection([
      t.type({
        name: t.string,
      }),
      t.partial({
        id: withFallback(t.string, 'id'),
      }),
    ])
    const input = {
      name: 'Ribeye 24OZ',
    }
    const expected = {
      name: 'Ribeye 24OZ',
      id: 'id',
    }
    const { data } = decode(input, product)

    expect(data).toStrictEqual(expected)
  })

  it('sets default value for recursive type', () => {
    interface Node {
      id: string
      type?: string
      children?: Array<Node>
    }

    const node: t.Type<Node> = t.recursion('Node', (self) =>
      t.intersection([
        t.type({
          id: t.string,
        }),
        t.partial({
          type: withFallback(t.string, 'type'),
          children: t.array(self),
        }),
      ]),
    )

    const input = {
      id: 'A',
      children: [
        {
          id: 'B',
        },
      ],
    }
    const expected = {
      id: 'A',
      type: 'type',
      children: [
        {
          id: 'B',
          type: 'type',
        },
      ],
    }

    const { data } = decode(input, node)

    expect(data).toStrictEqual(expected)
  })
})
