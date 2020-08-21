import { treeReduce } from './Tree-reduce'
import {
  reducerData,
  reducerDataCustomChildrenKey,
} from './data/Tree-reducer.data'
import { NodeInterface } from '../node'

describe('Tree reducers', () => {
  type PageStats = {
    views: number
  }

  const reducer = (total: number, node: NodeInterface<PageStats>) => {
    return total + (node.props?.views ?? 0)
  }

  it('it reduces each node', () => {
    const viewCount = treeReduce()(reducer, 0, reducerData)

    expect(viewCount).toEqual(13)
  })

  it('it reduces each node using custom children key', () => {
    const viewCount = treeReduce('myChildren')(
      reducer,
      0,
      reducerDataCustomChildrenKey,
    )

    expect(viewCount).toEqual(13)
  })
})
