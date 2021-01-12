import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Menu, Skeleton } from 'antd'
import Link from 'next/link'
import React, { CSSProperties, FunctionComponent } from 'react'

export interface GetAppsItemProps {
  app: { title: string; id: string }
  loading?: boolean
  handleDeleteClick: (app: { id: string; title: string }) => void
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

const GetAppsItem: FunctionComponent<GetAppsItemProps> = ({
  app,
  loading,
  handleDeleteClick,
}) => {
  const actionsMenu = (
    <Menu>
      <Menu.Item
        key="0"
        style={menuItemStyle}
        onClick={() => handleDeleteClick(app)}
      >
        Delete
        <DeleteOutlined style={menuItemIconStyle} />
      </Menu.Item>
    </Menu>
  )

  const actionsButton = (
    <Dropdown overlay={actionsMenu} trigger={['click']}>
      <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
    </Dropdown>
  )

  return (
    <Card
      title={
        <Link href={`/apps/${app.id}`}>
          <a>{app.title}</a>
        </Link>
      }
      extra={actionsButton}
    >
      <Skeleton loading={loading} active />
    </Card>
  )
}

export default GetAppsItem
