import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import { Page } from '@codelab/frontend/shared'
import {
  AppFragment_app,
  AppFragment_app$key,
} from '../__generated__/AppFragment_app.graphql'
import { useFragment } from 'react-relay'
import { appFragment } from '../AppFragment'

export type GetAppsItemProps = {
  appRef: AppFragment_app$key
  handleDelete?: (entity: AppFragment_app) => void
  handleEdit?: (entity: AppFragment_app) => void
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

export const GetAppsItemRelay = ({
  appRef,
  handleDelete,
  handleEdit,
}: GetAppsItemProps) => {
  const app = useFragment(appFragment, appRef)

  console.log(app)

  const actionsMenu = (
    <Menu>
      <Menu.Item
        key="0"
        style={menuItemStyle}
        onClick={() => {
          if (app) {
            // handleEdit(app)
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
            // handleDelete(app)
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
