import { ApartmentOutlined } from '@ant-design/icons'
import { componentRef } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import type { ComponentColumnData } from './types'

export interface ActionColumnProps {
  component: ComponentColumnData
}

export const ActionColumn = observer<ActionColumnProps>(({ component }) => {
  const router = useRouter()
  const { componentService } = useStore()

  const onEdit = () => {
    componentService.updateModal.open(componentRef(component.id))
  }

  const onDelete = () => {
    componentService.deleteModal.open(componentRef(component.id))
  }

  const onBuilder = () => {
    void router.push({
      pathname: PageType.ComponentDetail,
      query: { componentId: component.id },
    })
  }

  return (
    <Space size="middle">
      <ListItemButton icon={<ApartmentOutlined />} onClick={onBuilder} />
      <ListItemEditButton onClick={onEdit} />
      <ListItemDeleteButton onClick={onDelete} />
      <Link href={`/api/export/component?id=${component.id}`}>
        <span>Export</span>
      </Link>
    </Space>
  )
})
