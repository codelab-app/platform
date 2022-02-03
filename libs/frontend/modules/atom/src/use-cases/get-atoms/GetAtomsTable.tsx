import { Table } from 'antd'
import React from 'react'
import { useGetAtomsQuery } from '../../store'
import { useAtomTable } from './useAtomTable'

export const GetAtomsTable = () => {
  const { columns, rowSelection, pagination } = useAtomTable()
  const { data, isLoading } = useGetAtomsQuery()
  const atoms = data?.atoms ?? []

  return (
    <Table
      columns={columns}
      dataSource={atoms}
      loading={isLoading}
      pagination={pagination}
      rowKey={(atom) => atom.id}
      rowSelection={rowSelection}
    />
  )
}
