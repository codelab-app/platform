import type {
  IAtomService,
  IFieldService,
  ITag,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useAsync } from 'react-use'
import { atomRef } from '../../store'
import type { AtomLibrary, AtomRecord } from './columns'
import { useAtomTable } from './useAtomTable'

const DEFAULT_PAGE_SIZE = 25
const DEFAULT_CUR_PAGE = 1

interface AtomsTableProps {
  atomService: IAtomService
  typeService: ITypeService
  fieldService: IFieldService
  getAtomLibrary: (atomType: string) => AtomLibrary
  page?: number
  pageSize?: number
}

export const AtomsTable = observer<AtomsTableProps>(
  ({
    atomService,
    typeService,
    fieldService,
    getAtomLibrary,
    page,
    pageSize,
  }) => {
    const { atomsList } = atomService

    if (atomsList.length) {
      const ref = atomRef(atomsList[0]!.id)
      console.log(ref)
    }

    const router = useRouter()
    const curPage = page ?? DEFAULT_CUR_PAGE
    const curPageSize = pageSize ?? DEFAULT_PAGE_SIZE

    const { columns, rowSelection, pagination, atomWhere, atomOptions } =
      useAtomTable({ atomService, fieldService, typeService })

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
      ({ name }) => name === latestFetchedAtoms?.[0]?.name,
    )

    const atomsData: Array<AtomRecord> = atomsList
      .slice(
        curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0,
        (curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0) + curPageSize,
      )
      .map((atom) => ({
        allowedChildren: atom.allowedChildren.map(
          (children) => children.current,
        ),
        apiId: atom.api.id,
        id: atom.id,
        library: getAtomLibrary(atom.type),
        name: atom.name,
        tags: atom.tags
          .map((tag) => tag.maybeCurrent)
          .filter(Boolean) as Array<ITag>,
        type: atom.type,
      }))

    return (
      <Table
        columns={columns}
        dataSource={atomsData}
        loading={loading}
        pagination={{
          ...pagination,
          current: curPage,
          onChange: handlePageChange,
          pageSize: curPageSize,
        }}
        rowKey={(atom) => atom.id}
        rowSelection={rowSelection}
        scroll={{ y: '80vh' }}
      />
    )
  },
)
