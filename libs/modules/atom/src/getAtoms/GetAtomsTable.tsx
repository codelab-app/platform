import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { EntityType, useCRUDModalForm } from '@codelab/frontend/shared'
import { useGetAtomsQuery } from '@codelab/graphql'
import { Button, Space, Spin, Table, TableColumnProps, Tag } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useColumnSearchProps } from './useColumnSearchProps'

export const GetAtomsTable = () => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(EntityType.Atom)
  const columnSearchProps = useColumnSearchProps('name')

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Name',
      dataIndex: 'label',
      key: 'type',
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
      onFilter: (value, record) => record.name.indexOf(value) === 0,
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
      title: 'Props',
      dataIndex: 'props',
      key: 'props',
      width: 100,
      onHeaderCell: headerCellProps,
      render: () => <a css={tw`text-blue-700`}>View</a>,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            css={tw`flex justify-center items-center`}
            icon={<EditFilled />}
            onClick={() => openUpdateModal(record.id, record)}
          />
          <Button
            size="small"
            type="primary"
            danger
            css={tw`flex justify-center items-center`}
            icon={<DeleteFilled />}
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
