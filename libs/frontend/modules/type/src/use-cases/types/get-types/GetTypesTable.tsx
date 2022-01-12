import { RightCircleOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/store/router'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table/interface'
import Link from 'next/link'
import React from 'react'
import { TypeFragment } from '../../../graphql/Type.fragment.graphql.gen'
import { useTypeDispatch } from '../../../hooks'
import { useGetTypesQuery } from '../../../store/typeEndpoints'

export const GetTypesTable = () => {
  const { data } = useGetTypesQuery()
  const { openDeleteModal, openUpdateModal } = useTypeDispatch()

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
              onClick={() =>
                openUpdateModal({
                  updateId: record.id,
                  entity: record,
                })
              }
            />
          )}

          <ListItemDeleteButton
            onClick={() => openDeleteModal({ deleteIds: [record.id] })}
          />
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
