import v from 'voca'
import { mapData, mapDataCustomChildrenKey, mapDataLowerProps } from './data'
import { treeMap } from './tree-map'
import { Mapper } from '@codelab/shared/interface/node'

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
    const mappedTreeData = treeMap(mapper)(mapData)

    expect(mappedTreeData).toStrictEqual(mapDataLowerProps)
  })

  it('it maps each node including children', () => {
    const mappedTreeData = treeMap(mapper, 'children', 'myChildren')(mapData)

    expect(mappedTreeData).toStrictEqual(mapDataCustomChildrenKey)
  })
})
