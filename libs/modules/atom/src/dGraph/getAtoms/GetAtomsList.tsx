import { DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { Atom, useGetAtomsQuery } from '@codelab/dgraph'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { List, Space } from 'antd'
import React from 'react'

export const GetAtomsList = () => {
  const { data } = useGetAtomsQuery()
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Atom)

  return (
    <List
      size="small"
      dataSource={(data?.queryAtom as any) || []}
      renderItem={(atom: Atom) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <div
            data-testid="get-atoms-list-item"
            data-test-atom-type={atom.type}
          >
            <Space style={{ width: '100%' }}>{atom.label}</Space>
          </div>
          <Space>
            <SettingOutlined
              data-testid="atom-update-button"
              onClick={() => openUpdateModal(atom.id)}
            />
            <DeleteOutlined
              data-testid="atom-delete-button"
              onClick={() => openDeleteModal([atom.id])}
            />
          </Space>
        </List.Item>
      )}
    />
  )
}
