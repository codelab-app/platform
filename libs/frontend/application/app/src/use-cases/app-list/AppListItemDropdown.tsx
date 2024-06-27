'use client'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import type { IApp } from '@codelab/shared/abstract/core'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import React from 'react'
import { useBuildAppModal } from '../build-app/build-app-modal.state'
import { useDeleteAppModal } from '../delete-app/delete-app.state'
import { useExportApp } from '../export-app/useExportApp.hook'

export interface AppListItemDropdownProps {
  app: IApp
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

export const AppListItemDropdown = ({ app }: AppListItemDropdownProps) => {
  const { pathname } = useUrl()
  //  const updateApp = useUpdateAppModal()
  const deleteAppModal = useDeleteAppModal()
  const buildAppModal = useBuildAppModal()
  const onEditClick = () => null
  const onDeleteClick = () => deleteAppModal.open(app)
  const onBuildClick = () => null
  const exportApp = useExportApp(app)
  const router = useRouter()

  const goToDomainsPage = async () => {
    const user = await getServerUser()
    const domainPage = `${pathname}/${user.username}/${app.slug}/domains`

    router.push(domainPage)
  }

  const menuItems: MenuProps['items'] = [
    {
      disabled: !app.domains.some(
        (domain) => !domain.domainConfig?.misconfigured,
      ),
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
      label: 'Export',
      onClick: async () => {
        await exportApp()
      },
      style: menuItemStyle,
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
    </Dropdown>
  )
}
