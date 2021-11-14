import { FileOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import { AppContext } from '@codelab/frontend/modules/app'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemEditButton,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { List, Space, Spin } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useGetPagesQuery } from '../../store/pageEndpoints'

export const GetPagesList = () => {
  const { app } = useContext(AppContext)
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Page)

  const { data, isLoading } = useGetPagesQuery({
    variables: {
      input: { byApp: { appId: app.id } },
    },
  })

  const pages = data?.pages

  return isLoading ? (
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
