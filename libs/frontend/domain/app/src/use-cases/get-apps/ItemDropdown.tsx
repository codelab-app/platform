import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  GlobalOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type {
  IApp,
  IAppService,
  IDomain,
} from '@codelab/frontend/abstract/core'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import React from 'react'
import { appRef } from '../../store'

export interface ItemMenuProps {
  app: IApp
  appService: IAppService
  domains?: Array<IDomain>
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
  ({ app, appService, domains }) => {
    const onEditClick = () => appService.updateModal.open(appRef(app.id))
    const onDeleteClick = () => appService.deleteModal.open(appRef(app.id))
    const onBuildClick = () => appService.buildModal.open(appRef(app.id))
    const router = useRouter()

    const goToDomainsPage = () =>
      router.push(`${router.pathname}/${app.id}/domains`)

    const menuItems: MenuProps['items'] = [
      {
        label: 'Build',
        key: 'build',
        onClick: onBuildClick,
        style: menuItemStyle,
        icon: <ToolOutlined style={menuItemIconStyle} />,
        disabled:
          !domains ||
          !domains.some((domain) => !domain.domainConfig.misconfigured),
      },
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
      {
        key: 'export',
        style: menuItemStyle,
        icon: <ExportOutlined style={menuItemIconStyle} />,
        label: (
          <Link href={`/api/export?appId=${app.id}`}>
            <span>Export</span>
          </Link>
        ),
      },
    ]

    return (
      <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
      </Dropdown>
    )
  },
)
