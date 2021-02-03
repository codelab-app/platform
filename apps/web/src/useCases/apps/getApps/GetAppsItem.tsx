import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Menu, Skeleton } from 'antd'
import Link from 'next/link'
import React, { CSSProperties, FunctionComponent } from 'react'
import { AppType } from '../state'
import { Page } from '@codelab/frontend'

export type GetAppsItemProps =
  | {
      app: AppType
      loading?: false
      handleDeleteClick: (app: AppType) => void
      handleEditClick: (app: AppType) => void
    }
  | {
      app?: never
      loading: true
      handleDeleteClick?: never
      handleEditClick?: never
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

export const GetAppsItem: FunctionComponent<GetAppsItemProps> = ({
  app,
  loading,
  handleDeleteClick,
  handleEditClick,
}) => {
  const actionsMenu = (
    <Menu>
      <Menu.Item
        key="0"
        style={menuItemStyle}
        onClick={() => {
          if (app && handleEditClick) {
            handleEditClick(app)
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
          if (app && handleDeleteClick) {
            handleDeleteClick(app)
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
            pathname: Page.APP_DETAIL.url,
            query: { appId: app?.id },
          }}
        >
          <a>
            {loading ? (
              <Skeleton
                loading={loading}
                active
                title
                avatar={false}
                paragraph={false}
              />
            ) : (
              app?.title
            )}
          </a>
        </Link>
      }
      loading={loading}
      extra={ellipsisMenu}
    >
      <Skeleton loading={loading} active />
    </Card>
  )
}
