import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { appRef, type IAppModel } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION, MODEL_UI } from '@codelab/frontend/abstract/types'
import { type FragmentType, useFragment } from '@codelab/frontend/infra/gql'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useUrl } from '@codelab/frontend-application-shared-store/router'
import { useModalState } from '@codelab/frontend-application-shared-store/ui'
import { useUser } from '@codelab/frontend-application-user/services'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type { IAppAggregate } from '@codelab/shared/abstract/core'
import { prettifyForConsole } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import type { CSSProperties } from 'react'
import React from 'react'
import {
  useBuildAppModal,
  useDeleteAppModal,
  useUpdateAppModal,
} from '../../store/app-modal.state'
import { useExportApp } from '../export-app/useExportApp.hook'
import {
  type AppListItem_AppFragment,
  AppListItem_appFragment,
} from './AppListItem'
import { DomainList_appFragment } from './DomainList_domains.fragment'

export interface ItemMenuProps {
  app: AppListItem_AppFragment
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

const downloadExportedData = async (app: IAppModel) => {
  const res = await restWebClient.get<IAppAggregate>(`app/export?id=${app.id}`)
  const filename = `${app.slug}.json`
  const contentType = 'application/json;charset=utf-8;'
  const a = document.createElement('a')

  a.download = filename
  a.href = `data:${contentType},${encodeURIComponent(
    prettifyForConsole(res.data),
  )}`
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const AppListItemDropdown = (props: ItemMenuProps) => {
  const app = useFragment(AppListItem_appFragment, props.app)
  const { pathname } = useUrl()
  const updateApp = useUpdateAppModal()
  const deleteApp = useDeleteAppModal()
  const buildApp = useBuildAppModal()
  const onEditClick = () => updateApp.openModal(app.id)
  const onDeleteClick = () => deleteApp.openModal(app.id)
  const onBuildClick = () => buildApp.openModal(app.id)
  const exportApp = useExportApp(props.app)
  const router = useRouter()
  const user = useUser()

  const goToDomainsPage = () =>
    router.push(`${pathname}/${user.username}/${app.slug}/domains`)

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
