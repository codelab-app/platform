import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  GlobalOutlined,
} from '@ant-design/icons'
import type { IApp, IAppService } from '@codelab/frontend/abstract/core'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import React from 'react'
import { appRef } from '../../store'

export interface ItemMenuProps {
  app: IApp
  appService: IAppService
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

export const ItemDropdown = observer<ItemMenuProps>(({ app, appService }) => {
  const onEditClick = () => appService.updateModal.open(appRef(app.id))
  const onDeleteClick = () => appService.deleteModal.open(appRef(app.id))
  const router = useRouter()

  const goToDomainsPage = () =>
    router.push(`${router.pathname}/${app.id}/domains`)

  const menuItems: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
      onClick: onEditClick,
      style: menuItemStyle,
      icon: <EditOutlined style={menuItemIconStyle} />,
    },
    {
      label: 'Domains',
      key: 'domains',
      onClick: goToDomainsPage,
      style: menuItemStyle,
      icon: <GlobalOutlined style={menuItemIconStyle} />,
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
