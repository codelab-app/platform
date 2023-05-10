import { ApartmentOutlined } from '@ant-design/icons'
import { componentRef } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { useAsync } from '@react-hookz/web'
import { Button, message, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import type { ComponentColumnData } from './types'

export interface ActionColumnProps {
  component: ComponentColumnData
}

export const ActionColumn = observer<ActionColumnProps>(({ component }) => {
  const router = useRouter()
  const { componentService } = useStore()

  const [{ status }, exportComponent] = useAsync(() =>
    fetch(`/api/export/component?id=${component.id}`),
  )

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

  const onExport = async () => {
    exportComponent
      .execute()
      .then(() => message.success('Export success!'))
      .catch(() => message.error('Export failed!'))
  }

  return (
    <Space size="middle">
      <ListItemButton icon={<ApartmentOutlined />} onClick={onBuilder} />
      <ListItemEditButton onClick={onEdit} />
      <ListItemDeleteButton onClick={onDelete} />
      <Button loading={status === 'loading'} onClick={onExport} type="text">
        Export
      </Button>
    </Space>
  )
})
