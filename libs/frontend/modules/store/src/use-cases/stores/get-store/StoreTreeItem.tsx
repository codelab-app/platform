import { Dropdown, Menu, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { storeRef, WithStoreService } from '../../../store'

export type TreeItemTitleProps = WithStoreService & {
  node: TreeDataNode
}

export const TreeItemTitle = observer<TreeItemTitleProps>(
  ({ node, storeService }) => {
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
  },
)
