import { PageType } from '@codelab/frontend/abstract/types'
import { Dropdown, Menu, TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
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

    const href = {
      pathname: PageType.Store,
      query: { storeId: node.key },
    }

    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div>
          <Link href={href}>
            <a>{node.title}</a>
          </Link>
        </div>
      </Dropdown>
    )
  },
)
