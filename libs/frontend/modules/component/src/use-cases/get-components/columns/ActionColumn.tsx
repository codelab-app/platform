import { ApartmentOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { componentRef } from '@codelab/frontend/presenter/container'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { IComponentService } from '@codelab/shared/abstract/core'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { ComponentColumnData } from './types'

export interface ActionColumnProps {
  component: ComponentColumnData
  componentService: IComponentService
}

export const ActionColumn = observer<ActionColumnProps>(
  ({ component, componentService }) => {
    const router = useRouter()

    const onEdit = () => {
      componentService.updateModal.open(componentRef(component.id))
    }

    const onDelete = () => {
      componentService.deleteModal.open(componentRef(component.id))
    }

    const onBuilder = () => {
      router.push({
        pathname: PageType.ComponentDetail,
        query: { componentId: component.id },
      })
    }

    return (
      <Space size="middle">
        <ListItemButton icon={<ApartmentOutlined />} onClick={onBuilder} />
        <ListItemEditButton onClick={onEdit} />
        <ListItemDeleteButton onClick={onDelete} />
      </Space>
    )
  },
)
