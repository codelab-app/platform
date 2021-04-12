import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import { AppType } from '../state'
import { Page } from '@codelab/frontend/shared'

export type GetAppsItemProps = {
  app: AppType
  handleDeleteClick: (app: any) => void
  handleEditClick: (app: any) => void
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

export const GetAppsItem = ({
  app,
  handleDeleteClick,
  handleEditClick,
}: GetAppsItemProps) => {
  const actionsMenu = (
    <Menu>
      <Menu.Item
        key="0"
        style={menuItemStyle}
        onClick={() => {
          if (app) {
            handleEditClick(app.id)
          }
        }}
      >
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>
      <Menu.Item
        key="1"
        style={menuItemStyle}
        onClick={() => {
          if (app) {
            handleDeleteClick(app.id)
          }
        }}
      >
        Delete
        <DeleteOutlined style={menuItemIconStyle} />
      </Menu.Item>
    </Menu>
  )

  const ellipsisMenu = (
    <Dropdown overlay={actionsMenu} trigger={['click']}>
      <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
    </Dropdown>
  )

  return (
    <Card
      title={
        <Link
          href={{
            pathname: Page.PAGE_DETAIL.url,
            query: { appId: app.id, pageId: app.pages[0]?.id },
          }}
        >
          <a>{app.name}</a>
        </Link>
      }
      extra={ellipsisMenu}
    />
  )
}
