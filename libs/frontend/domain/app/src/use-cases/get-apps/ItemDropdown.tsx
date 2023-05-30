import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  GlobalOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type { IApp, IDomain } from '@codelab/frontend/abstract/core'
import { appRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import React from 'react'

export interface ItemMenuProps {
  app: IApp
  domains?: Array<IDomain>
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

export const ItemDropdown = observer<ItemMenuProps>(({ app, domains }) => {
  const { appService, userService } = useStore()
  const onEditClick = () => appService.updateModal.open(appRef(app.id))
  const onDeleteClick = () => appService.deleteModal.open(appRef(app.id))
  const onBuildClick = () => appService.buildModal.open(appRef(app.id))
  const router = useRouter()

  const appOwner = userService.usersList.find(
    (user) => user.auth0Id === app.owner.auth0Id,
  )

  const goToDomainsPage = () =>
    router.push(`${router.pathname}/${appOwner?.username}/${app.name}/domains`)

  const menuItems: MenuProps['items'] = [
    {
      disabled:
        !domains ||
        !domains.some((domain) => !domain.domainConfig?.misconfigured),
      icon: <ToolOutlined style={menuItemIconStyle} />,
      key: 'build',
      label: 'Build',
      onClick: onBuildClick,
      style: menuItemStyle,
    },
    {
      icon: <EditOutlined style={menuItemIconStyle} />,
      key: 'edit',
      label: 'Edit',
      onClick: onEditClick,
      style: menuItemStyle,
    },
    {
      icon: <GlobalOutlined style={menuItemIconStyle} />,
      key: 'domains',
      label: 'Domains',
      onClick: goToDomainsPage,
      style: menuItemStyle,
    },
    {
      icon: <DeleteOutlined style={menuItemIconStyle} />,
      key: 'delete',
      label: 'Delete',
      onClick: onDeleteClick,
      style: menuItemStyle,
    },
    {
      icon: <ExportOutlined style={menuItemIconStyle} />,
      key: 'export',
      label: (
        <Link href={`/api/export/app?id=${app.id}`}>
          <span>Export</span>
        </Link>
      ),
      style: menuItemStyle,
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
    </Dropdown>
  )
})
