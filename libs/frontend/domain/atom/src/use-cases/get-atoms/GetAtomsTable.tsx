import { IAtomService } from '@codelab/frontend/abstract/core'
import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

interface GetAtomsTableProps {
  atomService: IAtomService
  fetchAtomsData: (
    where: Maybe<AtomWhere>,
    options: Maybe<AtomOptions>,
  ) => Promise<Array<AtomRecord>>
}

export const GetAtomsTable = observer<GetAtomsTableProps>(
  ({ atomService, fetchAtomsData }) => {
    const { columns, rowSelection, pagination, atomWhere, atomOptions } =
      useAtomTable(atomService)

    const { value: atomsData, loading } = useAsync(async () => {
      return fetchAtomsData(atomWhere, atomOptions)
    }, [atomWhere, atomOptions])

    return (
      <Table
        columns={columns}
        dataSource={atomsData}
        loading={loading}
        pagination={pagination}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    )
  },
)
