import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import type {
  IResource,
  IResourceService,
} from '@codelab/frontend/abstract/core'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import type { CSSProperties } from 'react'
import React from 'react'
import { resourceRef } from '../../store'

export interface ItemMenuProps {
  resource: IResource
  resourceService: IResourceService
}

const menuItemStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 'full',
}

const menuItemIconStyle: CSSProperties = {
  marginLeft: '1rem',
}

export const ItemDropdown = observer<ItemMenuProps>(
  ({ resource, resourceService }) => {
    const onEdit = () => {
      resourceService.updateModal.open(resourceRef(resource.id))
    }

    const onDelete = () => {
      resourceService.deleteModal.open(resourceRef(resource.id))
    }

    const menuItems: MenuProps['items'] = [
      {
        label: 'Edit',
        key: 'edit',
        onClick: onEdit,
        style: menuItemStyle,
        icon: <EditOutlined style={menuItemIconStyle} />,
      },
      {
        label: 'Delete',
        key: 'delete',
        onClick: onDelete,
        style: menuItemStyle,
        icon: <DeleteOutlined style={menuItemIconStyle} />,
      },
    ]

    return (
      <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
      </Dropdown>
    )
  },
)
