import { useAsyncState } from '@codelab/frontend/shared/utils'
import { Dropdown, Menu, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { StateStore, StoreModel, storeRef } from '../../../store'

export type TreeItemTitleProps = {
  node: DataNode
  stateStore: StateStore
}

export type GetStoresTableProps = {
  stateStore: StateStore
}

const TreeItemTitle = observer<TreeItemTitleProps>(({ node, stateStore }) => {
  const nodeId = node.key as string

  const onAddChild = () => {
    stateStore.createModal.open(storeRef(nodeId))
  }

  const onDelete = () => {
    stateStore.deleteModal.open([storeRef(nodeId)])
  }

  const onClick = () => {
    stateStore.setSelectedStores([storeRef(nodeId)])
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
      <div onClick={onClick}>{node.title}</div>
    </Dropdown>
  )
})

export const GetStoresTree = observer<GetStoresTableProps>(({ stateStore }) => {
  const [getStores] = useAsyncState(() => stateStore.getTree())
  const storesTrees = stateStore.storesTree.nodesList

  useEffect(() => {
    getStores()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tree<StoreModel>
      blockNode
      className="draggable-tree"
      titleRender={(node) => (
        <TreeItemTitle node={node} stateStore={stateStore} />
      )}
      treeData={storesTrees ? storesTrees : []}
    />
  )
})
