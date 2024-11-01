'use client'

import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { MenuProps } from 'antd'
import type { CSSProperties } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { PageType } from '@codelab/frontend/abstract/types'
import { Button, Dropdown } from 'antd'
import { useRouter } from 'next/navigation'

import { useBuildAppModal } from '../build-app/build-app.state'
import { useDeleteAppModal } from '../delete-app/delete-app.state'
import { useExportApp } from '../export-app'
import { useUpdateAppModal } from '../update-app/update-app.state'

export interface AppListItemDropdownProps {
  app: IAppModel
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
  const updateAppModal = useUpdateAppModal()
  const deleteAppModal = useDeleteAppModal()
  const buildAppModal = useBuildAppModal()
  const onEditClick = () => updateAppModal.open(app)
  const onDeleteClick = () => deleteAppModal.open(app)
  const onBuildClick = () => buildAppModal.open(app)
  const { exportApp, loading: loadingExportApp } = useExportApp(app)
  const router = useRouter()

  const goToDomainsPage = async () => {
    const url = PageType.DomainList({ appId: app.id })

    router.push(url)
  }

  const menuItems: MenuProps['items'] = [
    {
      disabled: !app.domains.some(
        (domain) => !domain.current.domainConfig?.misconfigured,
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
      icon: (
        <ExportOutlined spin={loadingExportApp} style={menuItemIconStyle} />
      ),
      key: 'export',
      label: 'Export',
      onClick: exportApp,
      style: menuItemStyle,
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button
        aria-label="More options"
        icon={<EllipsisOutlined />}
        role="button"
        shape="circle"
        type="text"
      />
    </Dropdown>
  )
}
