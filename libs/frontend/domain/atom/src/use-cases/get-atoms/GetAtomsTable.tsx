import type { IAtomService } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import type { AtomLibrary, AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

interface GetAtomsTableProps {
  atomService: IAtomService
  getAtomLibrary: (atomType: string) => AtomLibrary
}

export const GetAtomsTable = observer<GetAtomsTableProps>(
  ({ atomService, getAtomLibrary }) => {
    const { columns, rowSelection, pagination, atomWhere, atomOptions } =
      useAtomTable(atomService)

    const { loading } = useAsync(async () => {
      await atomService.getAll(atomWhere, atomOptions)
    }, [atomWhere, atomOptions])

    const atomsData: Array<AtomRecord> = atomService.atomsList.map((atom) => ({
      id: atom.id,
      type: atom.type,
      apiId: atom.api.id,
      name: atom.name,
      tags: atom.tags.map((tag) => tag.current),
      library: getAtomLibrary(atom.type),
      allowedChildren: atom.allowedChildren,
    }))

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
