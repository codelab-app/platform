import { IAtomService } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

interface GetAtomsTableProps {
  atomService: IAtomService
  atomsData: Array<AtomRecord>
  isLoading: boolean
}

export const GetAtomsTable = observer<GetAtomsTableProps>(
  ({ atomService, atomsData, isLoading }) => {
    const { columns, rowSelection, pagination } = useAtomTable(atomService)

    return (
      <Table
        columns={columns}
        dataSource={atomsData}
        loading={isLoading}
        pagination={pagination}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    )
  },
)
