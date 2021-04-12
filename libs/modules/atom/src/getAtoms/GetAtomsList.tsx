import { List, Space } from 'antd'
import React from 'react'
import { useGetAtomsListQuery } from '@codelab/hasura'
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'

export const GetAtomsList = () => {
  const { data } = useGetAtomsListQuery({})
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Atom)

  return (
    <List
      size="small"
      dataSource={data?.atom}
      renderItem={(atom: any) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <Space style={{ width: '100%' }}>{atom.type}</Space>
          <Space>
            <SettingOutlined onClick={() => openUpdateModal(atom.id)} />
            <DeleteOutlined onClick={() => openDeleteModal(atom.id)} />
          </Space>
        </List.Item>
      )}
    />
  )
}
