import { List, Space, Spin } from 'antd'
import React from 'react'
import { useGetLibrariesQuery } from '@codelab/hasura'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemSettingsButton,
  PageType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import Link from 'next/link'

export const GetLibrariesList = () => {
  const { data, loading } = useGetLibrariesQuery()
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.Library,
  )

  return loading ? (
    <Spin />
  ) : (
    <List
      size="small"
      dataSource={data?.library}
      renderItem={(library: any) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <Space style={{ width: '100%' }}>
            <Link
              href={{
                pathname: PageType.LibraryDetail,
                query: {
                  libraryId: library.id,
                },
              }}
            >
              {library.name}
            </Link>
          </Space>
          <Space>
            <ListItemSettingsButton
              onClick={() => openUpdateModal(library.id)}
            />
            <ListItemDeleteButton onClick={() => openDeleteModal(library.id)} />
          </Space>
        </List.Item>
      )}
    />
  )
}
