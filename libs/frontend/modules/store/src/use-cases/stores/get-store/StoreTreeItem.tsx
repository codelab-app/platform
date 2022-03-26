import { Dropdown, Menu, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, WithStoreService } from '../../../store'

export type TreeItemTitleProps = WithStoreService & {
  node: TreeDataNode
}

export const TreeItemTitle = observer<TreeItemTitleProps>(
  ({ node, storeService }) => {
    const store = storeService.store(node.key as string)

    if (!store) {
      return null
    }

    const onAddChild = () => {
      storeService.createModal.open(storeRef(store))
    }

    const onDelete = () => {
      storeService.deleteModal.open(storeRef(store))
    }

    const menu = (
      <Menu>
        <Menu.Item key="add-child" onClick={onAddChild}>
          Add Child
        </Menu.Item>
        <Menu.Item danger key="delete" onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div>{node.title}</div>
      </Dropdown>
    )
  },
)
