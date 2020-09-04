import { decode, DecodeError } from '@codelab/common'
import { nodeC } from '../../codec/Node.codec'
import { NodeA, NodeI } from '../../codec/Node.codec.i'
import { NodeTypeEnum } from '../../codec/Node--type.i'
import { ReactNodeA } from './Node-react'

describe('React Node', () => {
  it('provides a default ID if one is not provided', () => {
    const reactNode: NodeI = {
      nodeType: NodeTypeEnum.React,
      type: 'Menu',
    }

    const decoded = decode<NodeA, NodeA, NodeI>(reactNode, nodeC)
    const data = decoded.data as ReactNodeA

    // expect(data.type).toBe('Menu')
    expect(typeof data.id).toBe('string')
  })

  it('uses the input ID if one is provided', () => {
    const reactNode: NodeI = {
      id: 'menu-node',
      nodeType: NodeTypeEnum.React,
      type: 'Menu',
    }

    const decoded = decode<NodeA, NodeA, NodeI>(reactNode, nodeC)
    const data = decoded.data as ReactNodeA

    expect(data.id).toBe('menu-node')
  })

  it('throws an error for missing a type', () => {
    const incorrectInput: any = {
      nodeType: NodeTypeEnum.React,
    }
    const decodeIncorrectInput = () =>
      decode<NodeA, NodeA, NodeI>(incorrectInput, nodeC)

    expect(decodeIncorrectInput).toThrow(DecodeError)
  })
})
