import { decode, DecodeError } from '@codelab/shared/common'
import { nodeC } from '@codelab/core/node'
import { TreeNodeI } from './node-tree'
import { NodeA, NodeI } from '../../node--codec'
import { NodeTypeEnum } from '../../node--enum'

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
