import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { extractTableQueries } from '@codelab/frontend/shared/utils'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { useAsync } from '@react-hookz/web'
import type {
  ColumnType,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { ActionColumn, LibraryColumn, PropsColumn, TagsColumn } from './columns'
import { RequiredParentsColumn } from './columns/RequiredParentsColumn'
import { SuggestedChildrenColumn } from './columns/SuggestedChildrenColumn'
import type { AtomRecord } from './columns/types'

const onLibraryFilter = (
  value: boolean | number | string,
  atom: AtomRecord,
): boolean => {
  const list = [atom.name, atom.type].map((item) => item.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((item) => item.startsWith(search))
}

const DEFAULT_PAGE_SIZE = 25

export const useAtomTable = () => {
  const router = useRouter()
  const { page, pageSize, searchName } = extractTableQueries(router)
  const { atomService, fieldService } = useStore()

  const [{ result: currentData, status }, getAllAtoms] = useAsync(() => {
    const where = { name_MATCHES: `(?i).*${searchName ?? ''}.*` }

    const options = {
      limit: pageSize ?? DEFAULT_PAGE_SIZE,
      offset: ((page ?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
    }

    return atomService.getAll(where, options)
  })

  const handlePageChange = (newPage: number, newPageSize: number) => {
    void router.push({
      pathname: PageType.Atom,
      query: {
        page: newPage,
        pageSize: newPageSize,
        searchName,
      },
    })
  }

  useEffect(() => {
    void getAllAtoms.execute()
  }, [pageSize, page, searchName])

  const nameColumnSearchProps = useColumnSearchProps<AtomRecord>({
    dataIndex: 'name',
    onSearch: (value) => {
      void router.push({
        pathname: PageType.Atom,
        query: {
          page,
          pageSize,
          searchName: value,
        },
      })
    },
    text: searchName,
  })

  const columns: Array<ColumnType<AtomRecord>> = [
    {
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      title: 'Name',
      ...nameColumnSearchProps,
    },
    {
      dataIndex: 'library',
      key: 'library',
      onFilter: onLibraryFilter,
      onHeaderCell: headerCellProps,
      render: (library) => <LibraryColumn library={library} />,
      title: 'Library',
    },
    {
      dataIndex: 'tags',
      key: 'tags',
      onHeaderCell: headerCellProps,
      render: (tags) => <TagsColumn tags={tags} />,
      title: 'Tags',
    },
    {
      dataIndex: 'suggestedChildren',
      key: 'suggestedChildren',
      onHeaderCell: headerCellProps,
      render: (suggestedChildren) => {
        return <SuggestedChildrenColumn suggestedChildren={suggestedChildren} />
      },
      title: 'Suggested',
    },
    {
      dataIndex: 'requiredParents',
      key: 'requiredParents',
      onHeaderCell: headerCellProps,
      render: (requiredParents) => {
        return <RequiredParentsColumn requiredParents={requiredParents} />
      },
      title: 'Required',
    },
    {
      dataIndex: 'props',
      key: 'props',
      onHeaderCell: headerCellProps,
      render: (_, atom) => (
        <PropsColumn atom={atom} fieldService={fieldService} />
      ),
      title: 'Props API',
      width: 300,
    },
    {
      key: 'action',
      onHeaderCell: headerCellProps,
      render: (text, atom) => (
        <ActionColumn atom={atom} atomService={atomService} />
      ),
      title: 'Action',
      width: 100,
    },
  ]

  const rowSelection: TableRowSelection<AtomRecord> = {
    onChange: (_: Array<React.Key>, selectedRows: Array<AtomRecord>) => {
      atomService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
    type: 'checkbox',
  }

  const pagination: TablePaginationConfig = {
    current: page,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    onChange: handlePageChange,
    pageSize,
    position: ['bottomCenter'],
    total: atomService.count,
  }

  return { columns, currentData, pagination, rowSelection, status }
}
