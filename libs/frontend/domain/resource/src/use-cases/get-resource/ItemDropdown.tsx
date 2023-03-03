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
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
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
        icon: <EditOutlined style={menuItemIconStyle} />,
        key: 'edit',
        label: 'Edit',
        onClick: onEdit,
        style: menuItemStyle,
      },
      {
        icon: <DeleteOutlined style={menuItemIconStyle} />,
        key: 'delete',
        label: 'Delete',
        onClick: onDelete,
        style: menuItemStyle,
      },
    ]

    return (
      <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
      </Dropdown>
    )
  },
)
