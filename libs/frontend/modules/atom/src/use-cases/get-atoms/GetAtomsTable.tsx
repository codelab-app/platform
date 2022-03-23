import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { AtomService, WithAtomService } from '../../store'
import { AtomCellData } from './columns/types'
import { useAtomTable } from './useAtomTable'

export const GetAtomsTable = observer<WithAtomService>(({ atomService }) => {
  const { columns, rowSelection, pagination } = useAtomTable(atomService)
  const [getAtoms, { isLoading }] = useLoadingState(() => atomService.getAll())
  const atomsList = atomService.atomsList

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
