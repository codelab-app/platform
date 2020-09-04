import v from 'voca'
import { Mapper } from '../../../node/src/base/Node.i'
import {
  mapData,
  mapDataCustomChildrenKey,
  mapDataLowerProps,
} from './data/Tree-map.data'
import { treeMap } from './Tree-map'

describe('Tree mappers', () => {
  type TreeItem = {
    name: string
  }
  const mapper: Mapper<any, TreeItem> = (node) => ({
    ...node,
    props: {
      name: v.decapitalize(node.props?.name),
    },
  })

  it('it maps each node', () => {
    const mappedTreeData = treeMap()(mapper, mapData)

    expect(mappedTreeData).toStrictEqual(mapDataLowerProps)
  })

  it('it maps each node including children', () => {
    const mappedTreeData = treeMap('children', 'myChildren')(mapper, mapData)

    expect(mappedTreeData).toStrictEqual(mapDataCustomChildrenKey)
  })
})
