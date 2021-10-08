import { IBaseNode } from '@codelab/shared/abstract/core'
import { treeReduce } from '../tree-reduce'
import { reducerData, reducerDataCustomChildrenKey } from './tree-reduce.data'

describe('Tree reducers', () => {
  type PageStats = {
    views: number
    children: any
  }

  const reducer = (total: number, node: IBaseNode<PageStats>) => {
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
