import type { IAtom, ITag } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  headerCellProps,
  useColumnSearchProps,
} from '@codelab/frontend/presentation/view'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import {
  type AtomLibrary,
  type AtomRecord,
  ActionColumn,
  LibraryColumn,
  PropsColumn,
  TagsColumn,
} from './columns'
import { RequiredParentsColumn } from './columns/RequiredParentsColumn'
import { SuggestedChildrenColumn } from './columns/SuggestedChildrenColumn'

interface AtomsTableProps {
  getAtomLibrary(atomType: string): AtomLibrary
}

const onLibraryFilter = (
  value: boolean | number | string,
  atom: AtomRecord,
): boolean => {
  const list = [atom.name, atom.type].map((item) => item.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((item) => item.startsWith(search))
}

export const AtomsTable = observer<AtomsTableProps>(({ getAtomLibrary }) => {
  const { atomService, fieldService, typeService } = useStore()

  const { data, filter, handleChange, isLoading, pagination } =
    useTablePagination<IAtom, { name: string }>({
      filterTypes: { name: 'string' },
      pathname: PageType.Atom,
      service: atomService,
    })

  useEffect(() => {
    // This loads all types and will only fetch from the backend once
    // so that they will already be available on all TypeSelect fields
    void typeService.getAll()
  }, [])

  const nameColumnSearchProps = useColumnSearchProps<AtomRecord>({
    dataIndex: 'name',
    onSearch: (name) =>
      handleChange({ newFilter: { name: name || undefined } }),
    text: filter.name,
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

  const dataSource: Array<AtomRecord> | undefined = data.map((atom) => ({
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
    <Table<AtomRecord>
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={pagination}
      rowKey={(atom) => atom.id}
      scroll={{ y: '80vh' }}
      size="small"
    />
  )
})
