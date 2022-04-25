import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { APP_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IApp } from '@codelab/shared/abstract/core'
import { Button, Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { CSSProperties } from 'react'
import { appRef } from '../../store'

export type ItemMenuProps = {
  app: IApp
} & WithServices<APP_SERVICE>

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

export const ItemDropdown = observer<ItemMenuProps>(({ app, appService }) => {
  const onEditClick = () => appService.updateModal.open(appRef(app.id))
  const onDeleteClick = () => appService.deleteModal.open(appRef(app.id))

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
