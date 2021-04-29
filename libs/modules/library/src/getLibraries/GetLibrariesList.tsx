import { List, Space, Spin } from 'antd'
import React from 'react'
import { useGetLibrariesListQuery } from '@codelab/hasura'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemSettingsButton,
  useCRUDModalForm,
} from '@codelab/frontend/shared'

export const GetLibrariesList = () => {
  const { data, loading } = useGetLibrariesListQuery({})

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
          <Space style={{ width: '100%' }}>{library.name}</Space>
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
