import { decode, DecodeError } from '@codelab/common'
import { RefNodeI } from './Node-ref'
import { NodeA, NodeI } from './Node.codec.i'
import { NodeTypeEnum } from './Node--type.i'
import { nodeC } from './Node.codec'

describe('Ref Node', () => {
  it('sets the ID correctly', () => {
    const input: RefNodeI = {
      nodeType: NodeTypeEnum.Ref,
      id: 'A',
    }
    const { data } = decode<NodeA, NodeA, NodeI>(input, nodeC)

    expect(data.id).toBe('A')
  })

  it('throws an error for a missing ID', () => {
    const incorrectInput: any = {
      nodeType: NodeTypeEnum.Ref,
    }

    const decodeIncorrectInput = () =>
      decode<NodeA, NodeA, NodeI>(incorrectInput, nodeC)

    expect(decodeIncorrectInput).toThrow(DecodeError)
  })
})
