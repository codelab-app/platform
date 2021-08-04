import { __AtomFragment, useGetAtomsQuery } from '@codelab/codegen/graphql'
import {
  EntityType,
  ListItemDeleteButton,
  ListItemSettingsButton,
  PageType,
  useCrudModalForm,
} from '@codelab/frontend/shared'
import { Space, Spin, Table, TableColumnProps, Tag } from 'antd'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'
import { useColumnSearchProps } from './useColumnSearchProps'

export const GetAtomsTable = () => {
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Atom)
  const columnSearchProps = useColumnSearchProps('name')

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<__AtomFragment>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...columnSearchProps,
    },
    {
      title: 'Library',
      dataIndex: 'library',
      key: 'library',
      onHeaderCell: headerCellProps,
      filters: [
        {
          text: 'Ant Design',
          value: 'Ant Design',
        },
        {
          text: 'Orange',
          value: 'Orange',
        },
      ],
      onFilter: (value, record) =>
        record.name.toLowerCase().indexOf(value.toString().toLowerCase()) ===
          0 ||
        record.type.toLowerCase().indexOf(value.toString().toLowerCase()) === 0,
      render: (library = 'Ant Design') => {
        const color = library === 'Ant Design' ? 'geekblue' : 'orange'

        return (
          <Tag color={color} key={library}>
            {library}
          </Tag>
        )
      },
    },
    {
      title: 'Props API',
      dataIndex: 'props',
      key: 'props',
      width: 100,
      onHeaderCell: headerCellProps,
      render: (_, record) => (
        <Link
          href={PageType.InterfaceDetail.replace(
            '[interfaceId]',
            // eslint-disable-next-line react/forbid-foreign-prop-types
            record.api.id,
          )}
        >
          {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a css={tw`text-blue-700`}>View API</a>
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <ListItemSettingsButton
            onClick={() => openUpdateModal(record.id, record)}
          />

          <ListItemDeleteButton
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  const { data, loading } = useGetAtomsQuery()

  if (loading) {
    return <Spin />
  }

  const atoms = data?.atoms ?? []

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={atoms}
      columns={columns}
      rowKey={(atom) => atom.id}
    />
  )
}
