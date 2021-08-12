import { FileOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import { AppContext } from '@codelab/frontend/presenter/container'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemEditButton,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { useGetPagesQuery } from '@codelab/shared/codegen/graphql'
import { List, Space, Spin } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'

export const GetPagesList = () => {
  const { app } = useContext(AppContext)
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Page)

  const { data, loading } = useGetPagesQuery({
    variables: {
      input: { byApp: { appId: app.id } },
    },
  })

  const pages = data?.pages

  return loading ? (
    <Spin />
  ) : (
    <>
      <List
        size="small"
        dataSource={pages}
        renderItem={(page) => (
          <List.Item style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>
              <FileOutlined />
              <Link
                href={{
                  pathname: PageType.PageBuilder,
                  query: { appId: app.id, pageId: page.id },
                }}
              >
                <a>{page.name}</a>
              </Link>
            </Space>
            <Space>
              <ListItemEditButton
                onClick={() => openUpdateModal(page.id, page)}
              />
              <ListItemDeleteButton
                onClick={() => openDeleteModal([page.id], page)}
              />
            </Space>
          </List.Item>
        )}
      />
    </>
  )
}
