import { RightCircleOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import { headerCellProps } from '@codelab/frontend/style'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import React from 'react'
import { TypeFragment } from '../../../graphql/Type.fragment.api.graphql'
import { useGetTypesQuery } from './GetTypes.api.graphql'

export const GetTypesTable = () => {
  const { data, loading } = useGetTypesQuery()
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Type)

  const columns: ColumnsType<TypeFragment> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Kind',
      dataIndex: '__typename',
      key: 'typename',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('typename'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          {record.__typename === 'InterfaceType' ? (
            <Link
              href={PageType.InterfaceDetail.replace(
                '[interfaceId]',
                record.id,
              )}
            >
              <RightCircleOutlined />
            </Link>
          ) : (
            <ListItemEditButton
              onClick={() => openUpdateModal(record.id, record)}
            />
          )}

          <ListItemDeleteButton onClick={() => openDeleteModal([record.id])} />
        </Space>
      ),
    },
  ]

  return (
    <Table<TypeFragment>
      size="small"
      pagination={{ position: ['bottomCenter'] }}
      dataSource={data?.getTypes ?? []}
      columns={columns}
      rowKey={(type) => type.id}
    />
  )
}
