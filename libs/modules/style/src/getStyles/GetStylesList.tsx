import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { List, Space } from 'antd'
import React from 'react'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { useGetStylesListQuery } from '@codelab/hasura'

export const GetStylesList = () => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.Style,
  )

  const { data } = useGetStylesListQuery({})

  return (
    <>
      <List
        dataSource={data?.style}
        renderItem={(style: any) => (
          <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
            <Space style={{ width: '100%' }}>
              {style.name || 'Nameless style'}
            </Space>
            <Space>
              <SettingOutlined onClick={() => openUpdateModal(style.id)} />
              <DeleteOutlined onClick={() => openDeleteModal(style.id)} />
            </Space>
          </List.Item>
        )}
      />
    </>
  )
}
