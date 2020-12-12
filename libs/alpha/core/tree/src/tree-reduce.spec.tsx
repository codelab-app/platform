import { reducerData, reducerDataCustomChildrenKey } from './data'
import { treeReduce } from './tree-reduce'
import { NodeA, NodeType } from '@codelab/alpha/shared/interface/node'

describe('Tree reducers', () => {
  type PageStats = {
    views: number
  }

  const reducer = (total: number, node: NodeA<NodeType.Tree, PageStats>) => {
    return total + (node.props?.views ?? 0)
  }

  it('it reduces each node', () => {
    const viewCount = treeReduce(reducer)(0, reducerData)

    expect(viewCount).toEqual(13)
  })

  it('it reduces each node using custom children key', () => {
    const viewCount = treeReduce(reducer, 'myChildren')(
      0,
      reducerDataCustomChildrenKey,
    )

    expect(viewCount).toEqual(13)
  })
})
