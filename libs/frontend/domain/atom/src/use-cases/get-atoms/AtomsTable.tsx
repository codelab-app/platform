import type { ITag } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { AtomLibrary, AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

interface AtomsTableProps {
  getAtomLibrary(atomType: string): AtomLibrary
}

export const AtomsTable = observer<AtomsTableProps>(({ getAtomLibrary }) => {
  const { columns, currentData, pagination, rowSelection, status } =
    useAtomTable()

  const atomsData: Array<AtomRecord> | undefined = currentData?.map((atom) => ({
    api: atom.api.current,
    id: atom.id,
    library: getAtomLibrary(atom.type),
    name: atom.name,
    requiredParents: atom.requiredParents.map((children) => children.current),
    suggestedChildren: atom.suggestedChildren.map(
      (children) => children.current,
    ),
    tags: atom.tags
      .map((tag) => tag.maybeCurrent)
      .filter(Boolean) as Array<ITag>,
    type: atom.type,
  }))

  return (
    <Table
      columns={columns}
      dataSource={atomsData}
      loading={status === 'loading'}
      pagination={pagination}
      rowKey={(atom) => atom.id}
      rowSelection={rowSelection}
      scroll={{ y: '80vh' }}
    />
  )
})
