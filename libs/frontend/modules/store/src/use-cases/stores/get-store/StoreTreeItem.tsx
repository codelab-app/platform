import { DeleteOutlined, EditFilled, PlusOutlined } from '@ant-design/icons'
import { STORE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { ListItemButton } from '@codelab/frontend/view/components'
import { TreeDataNode } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { storeRef } from '../../../store'

export type TreeItemTitleProps = WithServices<STORE_SERVICE> & {
  node: TreeDataNode
}

export const TreeItemTitle = observer<TreeItemTitleProps>(
  ({ node, storeService }) => {
    const onAddChild = () => storeService.createModal.open()
    const onEdit = () => storeService.updateModal.open(storeRef(`${node.key}`))

    const onDelete = () =>
      storeService.deleteModal.open(storeRef(`${node.key}`))

    const href = {
      pathname: PageType.Store,
      query: { storeId: node.key },
    }

    return (
      <div css={tw`flex flex-row  items-center`}>
        <Link href={href}>
          <a css={tw`flex-grow`}>{node.title}</a>
        </Link>

        <ListItemButton icon={<PlusOutlined />} onClick={onAddChild} />
        <ListItemButton icon={<EditFilled />} onClick={onEdit} />
        <ListItemButton
          danger={true}
          icon={<DeleteOutlined />}
          onClick={onDelete}
        />
      </div>
    )
  },
)
