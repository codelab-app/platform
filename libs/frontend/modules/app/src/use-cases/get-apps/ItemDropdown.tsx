import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Spin } from 'antd'
import React, { CSSProperties } from 'react'
import { AppFragment } from '../../graphql/App.fragment.v2.graphql.gen'
import { useAppDispatch } from '../../hooks'
import { useExportApp } from '../export-app'

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
  const { openUpdateModal, openDeleteModal } = useAppDispatch()
  // const { exportApp, isExporting } = useExportApp(app)

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
      {/* <Menu.Item key="export" onClick={() => exportApp()} style={menuItemStyle}>
        Export
        {isExporting ? <Spin /> : <ExportOutlined style={menuItemIconStyle} />}
      </Menu.Item> */}

      <Menu.Item key="edit" onClick={onClickEdit} style={menuItemStyle}>
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>

      <Menu.Item key="delete" onClick={onClickDelete} style={menuItemStyle}>
        Delete
        <DeleteOutlined style={menuItemIconStyle} />
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={actionsMenu} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
    </Dropdown>
  )
}
