import { SpinnerWrapper } from '@codelab/frontend/view/components'
import { Space, Table } from 'antd'
import React from 'react'
import { useGetAtomsQuery } from '../../store'
import { ExportAtomsButton } from '../export-atoms'
import { ImportAtomsUpload } from '../import-atoms'
import { useAtomTable } from './useAtomTable'

export const GetAtomsTable = () => {
  const { columns, rowSelection, pagination, selectedIds } = useAtomTable()
  const { data, isLoading } = useGetAtomsQuery()
  const atoms = data?.getAtoms ?? []

  return (
    <SpinnerWrapper isLoading={isLoading}>
      <Space style={{ marginBottom: 16 }}>
        <ExportAtomsButton atomIds={selectedIds} />
        <ImportAtomsUpload />
      </Space>
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
