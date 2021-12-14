import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Table } from 'antd'
import React from 'react'
import { useGetAtomsQuery } from '../../store'
import { useAtomTable } from './useAtomTable'

export const GetAtomsTable = () => {
  const { columns, rowSelection, pagination, selectedIds } = useAtomTable()
  const { data, isLoading } = useGetAtomsQuery()
  const atoms = data?.getAtoms ?? []

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Table
        rowSelection={rowSelection}
        pagination={pagination}
        dataSource={atoms}
        columns={columns}
        rowKey={(atom) => atom.id}
      />
    </SpinnerWrapper>
  )
}
