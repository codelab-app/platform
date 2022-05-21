import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { APP_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IApp } from '@codelab/shared/abstract/core'
import { Button, Dropdown, Menu, MenuProps } from 'antd'
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

  const menuItems: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
      onClick: onEditClick,
      style: menuItemStyle,
      icon: <EditOutlined style={menuItemIconStyle} />,
    },
    {
      label: 'Delete',
      key: 'delete',
      onClick: onDeleteClick,
      style: menuItemStyle,
      icon: <DeleteOutlined style={menuItemIconStyle} />,
    },

    /*     
      {
        label: 'Export',
        key: 'export',
        onClick: () => exportApp(),
        style: menuItemStyle,
        icon: isExporting ? <Spin /> : <ExportOutlined style={menuItemIconStyle} />,
      },
    */
  ]

  return (
    <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
    </Dropdown>
  )
})
