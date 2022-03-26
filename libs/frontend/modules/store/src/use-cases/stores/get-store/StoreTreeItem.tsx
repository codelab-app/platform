import { Dropdown, Menu, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, WithStoreService } from '../../../store'

export type TreeItemTitleProps = WithStoreService & {
  node: TreeDataNode
}

export const TreeItemTitle = observer<TreeItemTitleProps>(
  ({ node, storeService }) => {
    const onAddChild = () =>
      storeService.createModal.open(storeRef(node.key as string))

    const onDelete = () =>
      storeService.deleteModal.open(storeRef(node.key as string))

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
