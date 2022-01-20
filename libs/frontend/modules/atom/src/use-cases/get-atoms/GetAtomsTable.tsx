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
        columns={columns}
        dataSource={atoms}
        pagination={pagination}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    </SpinnerWrapper>
  )
}
