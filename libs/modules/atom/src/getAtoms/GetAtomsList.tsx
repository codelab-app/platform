import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { useGetAtomsListQuery } from '@codelab/hasura'
import { List, Space } from 'antd'
import React from 'react'

export const GetAtomsList = () => {
  const { data } = useGetAtomsListQuery({})
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Atom)

  return (
    <List
      size="small"
      dataSource={data?.atom}
      renderItem={(atom: any) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <div
            data-testid="get-atoms-list-item"
            data-test-atom-type={atom.type}
          >
            <Space style={{ width: '100%' }}>{atom.type}</Space>
          </div>
          <Space>
            <SettingOutlined
              data-testid="atom-update-button"
              onClick={() => openUpdateModal(atom.id)}
            />
            <DeleteOutlined
              data-testid="atom-delete-button"
              onClick={() => openDeleteModal(atom.id)}
            />
          </Space>
        </List.Item>
      )}
    />
  )
}
