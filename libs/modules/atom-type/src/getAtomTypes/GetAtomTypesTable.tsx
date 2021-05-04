import { __AtomTypeFragment, useGetAtomTypesQuery } from '@codelab/hasura'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'
import { DeleteAtomTypeButton } from '../deleteAtomType'
import { UpdateAtomTypeButton } from '../updateAtomType/UpdateAtomTypeButton'

export const GetAtomTypesTable = () => {
  const { data, loading } = useGetAtomTypesQuery()

  if (loading) {
    return null
  }

  const atomTypes = data?.atom_type

  const columns: ColumnsType<__AtomTypeFragment> = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return (
          <Space>
            <UpdateAtomTypeButton id={record.id} disabled={false} />
            <DeleteAtomTypeButton ids={[record.id]} disabled={false} />
          </Space>
        )
      },
    },
  ]

  const dataSource = atomTypes?.map((atomType) => ({
    key: atomType.id,
    id: atomType.id,
    label: atomType.label,
  }))

  return <Table size="middle" dataSource={dataSource} columns={columns} />
}
