import { DeleteOutlined, EllipsisOutlined } from '@ant-design/icons'
import { Button, Card, Dropdown, Menu, Modal, Skeleton } from 'antd'
import React, { CSSProperties, FunctionComponent } from 'react'

export interface GetAppsItemProps {
  app: { title: string; id: string }
  loading?: boolean
  onDeleteConfirmed: (id: string) => any
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
  onDeleteConfirmed,
}) => {
  const handleDeleteClick = () => {
    Modal.confirm({
      title: `Are you sure you want to delete the app "${app.title}"`,
      content: 'This action is not reversible',
      okType: 'danger',
      okText: 'Delete app',
      onOk: () => onDeleteConfirmed(app.id),
    })
  }

  const actionsMenu = (
    <Menu>
      <Menu.Item key="0" style={menuItemStyle} onClick={handleDeleteClick}>
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
    <Card title={app.title} extra={actionsButton}>
      <Skeleton loading={loading} active />
    </Card>
  )
}

export default GetAppsItem
