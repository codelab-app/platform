import { decode, DecodeError } from '@codelab/shared/common'
import { TreeNodeI } from './Node-tree'
import { NodeA, NodeI } from '../../codec/Node.codec.i'
import { NodeTypeEnum } from '../../codec/Node--type.i'
import { nodeC } from '../../codec/Node.codec'

describe('Tree Node', () => {
  it('sets the ID correctly', () => {
    const input: TreeNodeI = {
      nodeType: NodeTypeEnum.Tree,
      id: 'A',
    }
    const { data } = decode<NodeA, NodeA, NodeI>(input, nodeC)

    expect(data.id).toBe('A')
  })

  it('throws an error for a missing ID', () => {
    const incorrectInput: any = {
      nodeType: NodeTypeEnum.Tree,
    }

    const decodeIncorrectInput = () =>
      decode<NodeA, NodeA, NodeI>(incorrectInput, nodeC)

    expect(decodeIncorrectInput).toThrow(DecodeError)
  })
})
