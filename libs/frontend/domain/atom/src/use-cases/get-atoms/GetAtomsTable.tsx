import type { IAtomService } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useAsync } from 'react-use'
import type { AtomLibrary, AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

const DEFAULT_PAGE_SIZE = 25
const DEFAULT_CUR_PAGE = 1

interface GetAtomsTableProps {
  atomService: IAtomService
  getAtomLibrary: (atomType: string) => AtomLibrary
  page?: number
  pageSize?: number
}

export const GetAtomsTable = observer<GetAtomsTableProps>(
  ({ atomService, getAtomLibrary, page, pageSize }) => {
    const { atomsList } = atomService
    const router = useRouter()
    const curPage = page ?? DEFAULT_CUR_PAGE
    const curPageSize = pageSize ?? DEFAULT_PAGE_SIZE

    const { columns, rowSelection, pagination, atomWhere, atomOptions } =
      useAtomTable(atomService)

    const { value: latestFetchedAtoms, loading } = useAsync(async () => {
      return await atomService.getAll(atomWhere, atomOptions)
    }, [atomWhere, atomOptions])

    const handlePageChange = useCallback(
      (newPage: number, newPageSize: number) => {
        void router.push({
          pathname: PageType.Atom,
          query: {
            page: newPage,
            pageSize: newPageSize,
          },
        })
      },
      [router],
    )

    /**
     * Change page if specified
     */
    useEffect(() => {
      if (curPage && pageSize) {
        pagination.onChange?.(curPage, pageSize)
      }
    }, [curPage, pageSize, pagination])

    const curPageDataStartIndex = atomsList.findIndex(
      (t) => t.name === latestFetchedAtoms?.[0]?.name,
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
          current: curPage,
          onChange: handlePageChange,
        }}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
      />
    )
  },
)
