import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Card, Dropdown, Menu, Skeleton } from 'antd'
import Link from 'next/link'
import React, { CSSProperties, FunctionComponent } from 'react'
import { APP_DETAIL_PAGE } from '../../../../../frontend/src/config/Router'

export interface GetAppsItemProps {
  app: { title: string; id: string }
  loading?: boolean
  handleDeleteClick: (app: { id: string; title: string }) => void
  handleEditClick: (app: { id: string; title: string }) => void
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
          if (app) handleEditClick(app)
        }}
      >
        Edit
        <EditOutlined style={menuItemIconStyle} />
      </Menu.Item>
      <Menu.Item
        key="1"
        style={menuItemStyle}
        onClick={() => {
          if (app) handleDeleteClick(app)
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
            pathname: APP_DETAIL_PAGE.url,
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
