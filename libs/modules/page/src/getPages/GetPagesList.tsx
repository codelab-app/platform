import { FileOutlined } from '@ant-design/icons'
import {
  AppContext,
  EntityType,
  ListItemDeleteButton,
  ListItemSettingsButton,
  PageType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { useGetPagesListQuery } from '@codelab/hasura'
import { List, Space, Spin } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'

export const GetPagesList = () => {
  const { appId } = useContext(AppContext)
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Page)

  const { data, loading } = useGetPagesListQuery({
    variables: {
      appId,
    },
  })

  return loading ? (
    <Spin />
  ) : (
    <>
      <List
        size="small"
        dataSource={data?.app_by_pk?.pages}
        renderItem={(page) => (
          <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>
              <FileOutlined />
              <Link
                href={{
                  pathname: PageType.PageDetail,
                  query: { appId, pageId: page.id },
                }}
              >
                <a>{page.name}</a>
              </Link>
            </Space>
            <Space>
              <ListItemSettingsButton
                onClick={() => openUpdateModal(page.id)}
              />
              <ListItemDeleteButton
                onClick={() => openDeleteModal([page.id])}
              />
            </Space>
          </List.Item>
        )}
      />
    </>
  )
}
