import v from 'voca'
import { Mapper } from '@codelab/shared/interface/node'
import { mapData, mapDataCustomChildrenKey, mapDataLowerProps } from './data'
import { treeMap } from './tree-map'

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
