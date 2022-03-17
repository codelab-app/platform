import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { CSSProperties } from 'react'
import { AppModel, appRef, AppStore } from '../../store'

export type ItemMenuProps = {
  apps: AppStore
  app: AppModel
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

export const ItemDropdown = observer(({ app, apps }: ItemMenuProps) => {
  const onEditClick = () => {
    apps.updateModal.open(appRef(app))
  }

  const onDeleteClick = () => {
    apps.deleteModal.open(appRef(app))
  }

  const actionsMenu = (
    <Menu>
      {/* <Menu.Item key="export" onClick={() => exportApp()} style={menuItemStyle}>
        Export
        {isExporting ? <Spin /> : <ExportOutlined style={menuItemIconStyle} />}
      </Menu.Item> */}

      <Menu.Item key="edit" onClick={onEditClick} style={menuItemStyle}>
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>

      <Menu.Item key="delete" onClick={onDeleteClick} style={menuItemStyle}>
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
})
