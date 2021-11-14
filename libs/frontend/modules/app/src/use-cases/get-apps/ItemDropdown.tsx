import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import React, { CSSProperties } from 'react'
import { AppFragment } from '../../graphql/App.fragment.graphql.gen'
import { useApp } from '../../store/useApp'

export type ItemMenuProps = {
  app: AppFragment
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

export const ItemDropdown = ({ app }: ItemMenuProps) => {
  const { openUpdateModal, openDeleteModal } = useApp()

  const onClickEdit = () =>
    openUpdateModal({
      updateId: app.id,
      entity: app,
    })

  const onClickDelete = () =>
    openDeleteModal({
      deleteIds: [app.id],
      entity: app,
    })

  const actionsMenu = (
    <Menu>
      <Menu.Item key="edit" style={menuItemStyle} onClick={onClickEdit}>
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>

      <Menu.Item key="delete" style={menuItemStyle} onClick={onClickDelete}>
        Delete
        <DeleteOutlined style={menuItemIconStyle} />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={actionsMenu} trigger={['click']}>
      <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
    </Dropdown>
  )
}
