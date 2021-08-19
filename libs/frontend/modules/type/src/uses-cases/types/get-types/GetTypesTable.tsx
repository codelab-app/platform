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
import {
  __TypeFragment,
  useGetTypesQuery,
} from '@codelab/shared/codegen/graphql'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import React from 'react'

export const GetTypesTable = () => {
  const { data, loading } = useGetTypesQuery()
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Type)

  const columns: ColumnsType<__TypeFragment> = [
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
            <ListItemEditButton onClick={() => openUpdateModal(record.id)} />
          )}

          <ListItemDeleteButton onClick={() => openDeleteModal([record.id])} />
        </Space>
      ),
    },
  ]

  return (
    <Table<__TypeFragment>
      pagination={{ position: ['bottomCenter'] }}
      dataSource={data?.getTypes ?? []}
      columns={columns}
      rowKey={(type) => type.id}
    />
  )
}
