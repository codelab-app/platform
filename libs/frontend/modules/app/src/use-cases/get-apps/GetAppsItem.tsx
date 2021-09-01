import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import { useCrudModalForm } from '@codelab/frontend/view/components'
import { Button, Card, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import React, { CSSProperties } from 'react'
import { AppFragment } from '../../App.fragment.api.graphql'

export type GetAppsItemProps = {
  app: AppFragment
  handleDeleteClick: ReturnType<typeof useCrudModalForm>['openDeleteModal']
  handleEditClick: ReturnType<typeof useCrudModalForm>['openUpdateModal']
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
            handleEditClick(app.id, app)
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
            handleDeleteClick([app.id], app)
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
            pathname: PageType.PageList,
            query: {
              appId: app.id,
              // pageId: app?.pages[0]?.id,
              // pane: PaneType.Page,
            },
          }}
        >
          <a>{app.name}</a>
        </Link>
      }
      extra={ellipsisMenu}
    />
  )
}
