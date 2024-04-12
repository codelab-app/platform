import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import ExportOutlined from '@ant-design/icons/ExportOutlined'
import GlobalOutlined from '@ant-design/icons/GlobalOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { appRef, type IAppModel } from '@codelab/frontend/abstract/domain'
import { restWebClient } from '@codelab/frontend/application/axios'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { IAppAggregate } from '@codelab/shared/abstract/core'
import { prettifyForConsole } from '@codelab/shared/utils'
import { useAsync } from '@react-hookz/web'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import type { CSSProperties } from 'react'
import React from 'react'

export interface ItemMenuProps {
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

export const ItemDropdown = observer<ItemMenuProps>(({ app }) => {
  const { appService, userService } = useStore()
  const onEditClick = () => appService.updateModal.open(appRef(app))
  const onDeleteClick = () => appService.deleteModal.open(appRef(app))
  const onBuildClick = () => appService.buildModal.open(appRef(app))
  const [, exportApp] = useAsync(appService.exportApp)
  const router = useRouter()

  const goToDomainsPage = () =>
    router.push(
      `${router.pathname}/${userService.user.username}/${app.slug}/domains`,
    )

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
        await exportApp.execute(app)
      },
      style: menuItemStyle,
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} shape="circle" type="text" />
    </Dropdown>
  )
})
