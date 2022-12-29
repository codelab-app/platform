import type { IAtomService } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import type { AtomLibrary, AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

interface GetAtomsTableProps {
  atomService: IAtomService
  getAtomLibrary: (atomType: string) => AtomLibrary
}

export const GetAtomsTable = observer<GetAtomsTableProps>(
  ({ atomService, getAtomLibrary }) => {
    const { atomsList } = atomService

    const { columns, rowSelection, pagination, atomWhere, atomOptions } =
      useAtomTable(atomService)

    const { value: latestFetchedAtoms, loading } = useAsync(async () => {
      return await atomService.getAll(atomWhere, atomOptions)
    }, [atomWhere, atomOptions])

    const [curPageSize, setCurPageSize] = useState(25)

    const curPageDataStartIndex = atomsList.findIndex(
      (t) => t.id === latestFetchedAtoms?.[0]?.id,
    )

    const atomsData: Array<AtomRecord> = atomsList
      .slice(
        curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0,
        (curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0) + curPageSize,
      )
      .map((atom) => ({
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
        pagination={{
          ...pagination,
          pageSize: curPageSize,
          onChange(page, pageSize) {
            setCurPageSize(pageSize)
            pagination.onChange?.(page, pageSize)
          },
        }}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    )
  },
)
