import { DeleteFilled, EditFilled } from '@ant-design/icons'
import {
  EntityType,
  PageType,
  useCRUDModalForm,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import {
  CreateInterfaceInput,
  useCreateInterfaceMutation,
  useGetInterfacesQuery,
} from '@codelab/graphql'
import { Button, Space, Spin, Table, TableColumnProps } from 'antd'
import Link from 'next/link'
import React from 'react'
import tw from 'twin.macro'

export const GetInterfacesTable = () => {
  const { openDeleteModal } = useCRUDModalForm(EntityType.Interface)

  useMutationCrudForm({
    entityType: EntityType.Interface,
    mapVariables: (submitData: CreateInterfaceInput) => ({
      input: {
        ...submitData,
      },
    }),
    useMutationFunction: useCreateInterfaceMutation,
    mutationOptions: { errorPolicy: 'all' },
    mutationFunctionOptions: { context: { asd: 'asd' } },
  })

  const { data, loading } = useGetInterfacesQuery()

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<any>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      render: (text, record) => (
        <Link
          href={PageType.InterfaceDetail.replace('[interfaceId]', record.id)}
        >
          {text}
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
          <Button
            size="small"
            type="primary"
            danger
            tw="flex justify-center items-center"
            icon={<DeleteFilled />}
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  if (loading) {
    return <Spin />
  }

  const Interfaces = data?.getInterfaces ?? []

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={Interfaces}
      columns={columns}
      rowKey={(atom) => atom.id}
    />
  )
}
