import { useAsyncState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { AtomStore } from '../../store'
import { AtomCellData } from './columns/types'
import { useAtomTable } from './useAtomTable'

export interface GetAtomsTableProps {
  atomStore: AtomStore
}

export const GetAtomsTable = observer<GetAtomsTableProps>(({ atomStore }) => {
  const { columns, rowSelection, pagination } = useAtomTable(atomStore)
  const [getAtoms, { isLoading }] = useAsyncState(() => atomStore.getAll())
  const atomsList = atomStore.atomsList

  const atomsData: Array<AtomCellData> = atomsList.map((a) => ({
    id: a.id,
    type: a.type,
    apiId: a.api.id,
    name: a.name,
    tagIds: a.tagIds,
  }))

  useEffect(() => {
    getAtoms()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
})
