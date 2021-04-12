import { List, Space } from 'antd'
import React from 'react'
import { useGetLibrariesListQuery } from '@codelab/hasura'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

export const GetLibrariesList = () => {
  const { data } = useGetLibrariesListQuery({})

  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.Library,
  )

  return (
    <List
      size="small"
      dataSource={data?.library}
      renderItem={(library: any) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <Space style={{ width: '100%' }}>{library.name}</Space>
          <Space>
            <SettingOutlined onClick={() => openUpdateModal(library.id)} />
            <DeleteOutlined onClick={() => openDeleteModal(library.id)} />
          </Space>
        </List.Item>
      )}
    />
  )
}
