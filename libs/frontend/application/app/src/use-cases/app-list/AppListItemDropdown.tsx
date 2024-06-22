'use client'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useUser } from '@codelab/frontend-application-user/services'
import type { IAppDto } from '@codelab/shared/abstract/core'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import React, { useMemo } from 'react'
import { useExportApp } from '../export-app/useExportApp.hook'

export interface AppListItemDropdownProps {
  app: IAppDto
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
  const { appDomainService } = useDomainStore()
  //  const updateApp = useUpdateAppModal()
  //  const deleteApp = useDeleteAppModal()
  //  const buildApp = useBuildAppModal()

  const appModel = useMemo(
    () => appDomainService.hydrate(app),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [app],
  )

  const onEditClick = () => null
  const onDeleteClick = () => null
  const onBuildClick = () => null
  const exportApp = useExportApp(appModel)
  const router = useRouter()
  const user = useUser()

  const goToDomainsPage = () => {
    router.push(`${pathname}/${user.username}/${appModel.slug}/domains`)
  }

  const menuItems: MenuProps['items'] = [
    {
      disabled: !appModel.domains.some(
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
