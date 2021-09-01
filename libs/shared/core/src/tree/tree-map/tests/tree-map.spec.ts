import { Mapper } from '@codelab/shared/abstract/types'
import * as v from 'voca'
import { treeMap } from '../tree-map'
import {
  mapData,
  mapDataCustomChildrenKey,
  mapDataLowerProps,
} from './tree-map.data'

describe('Tree mappers', () => {
  type TreeItem = {
    children: any
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
