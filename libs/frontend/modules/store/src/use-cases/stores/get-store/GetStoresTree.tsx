import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Dropdown, Menu, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { storeRef, StoreService } from '../../../store'

export type TreeItemTitleProps = {
  node: DataNode
  storeService: StoreService
}

export type GetStoresTableProps = {
  storeService: StoreService
}

const TreeItemTitle = observer<TreeItemTitleProps>(({ node, storeService }) => {
  const nodeId = node.key as string

  const onAddChild = () => {
    storeService.createModal.open()
  }

  const onDelete = () => {
    storeService.deleteModal.open(storeRef(nodeId))
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={onAddChild}>Add Child</Menu.Item>
      <Menu.Item danger onClick={onDelete}>
        Delete
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']}>
      <div>{node.title}</div>
    </Dropdown>
  )
})

export const GetStoresTree = observer<GetStoresTableProps>(
  ({ storeService }) => {
    const [getStores] = useLoadingState(() => storeService.getTree())
    const storesTrees: Array<DataNode> = storeService.storesTree.getAntdTree()

    useEffect(() => {
      getStores()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <Tree
        blockNode
        className="draggable-tree"
        titleRender={(node) => (
          <TreeItemTitle node={node} storeService={storeService} />
        )}
        treeData={storesTrees ? storesTrees : []}
      />
    )
  },
)
