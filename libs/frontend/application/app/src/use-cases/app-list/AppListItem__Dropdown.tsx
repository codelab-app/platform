import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import React from 'react'
import {
  useBuildAppModal,
  useDeleteAppModal,
  useUpdateAppModal,
} from '../../store/app-modal.state'
import { useExportApp } from '../export-app/useExportApp.hook'

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

export const AppListItemDropdown = ({ app }: { app: IAppModel }) => {
  const { pathname } = useUrl()
  const updateApp = useUpdateAppModal()
  const deleteApp = useDeleteAppModal()
  const buildApp = useBuildAppModal()
  const onEditClick = () => updateApp.openModal(app.id)
  const onDeleteClick = () => deleteApp.openModal(app.id)
  const onBuildClick = () => buildApp.openModal(app.id)
  const exportApp = useExportApp(app)
  const router = useRouter()
  // const user = useUser()

  const goToDomainsPage = () => {
    // router.push(`${pathname}/${user.username}/${app.slug}/domains`)
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
