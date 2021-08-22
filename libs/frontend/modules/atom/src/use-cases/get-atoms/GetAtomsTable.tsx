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
  __AtomFragment,
  useGetAtomsQuery,
} from '@codelab/shared/codegen/graphql'
import { Space, Spin, Table, TableColumnProps, Tag } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import tw from 'twin.macro'
import { ExportAtomsButton } from '../export-atoms/ExportAtomsButton'

export type Record = __AtomFragment

export const GetAtomsTable = () => {
  const { openDeleteModal, openUpdateModal } = useCrudModalForm(EntityType.Atom)
  const [selectedIds, setSelectedIds] = useState<Array<string>>([])
  const { data, loading } = useGetAtomsQuery()

  const columns: Array<TableColumnProps<Record>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('label'),
    },
    {
      title: 'Library',
      dataIndex: 'library',
      key: 'library',
      onHeaderCell: headerCellProps,
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
          <ListItemEditButton
            onClick={() => openUpdateModal(record.id, record)}
          />

          <ListItemDeleteButton
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  if (loading) {
    return <Spin />
  }

  const atoms = data?.atoms ?? []

  const rowSelection = {
    onChange: (
      _selectedRowKeys: Array<React.Key>,
      _selectedRows: Array<Record>,
    ) => {
      setSelectedIds(_selectedRows.map(({ id }) => id))
    },
    getCheckboxProps: (record: Record) => {
      return {
        // disabled: record.name === 'Disabled User', // Column configuration not to be checked
        // name: record.name,
      }
    },
  }

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <ExportAtomsButton atomIds={selectedIds} />
      </Space>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={{ position: ['bottomCenter'], defaultPageSize: 25 }}
        dataSource={atoms}
        columns={columns}
        rowKey={(atom) => atom.id}
      />
    </>
  )
}
