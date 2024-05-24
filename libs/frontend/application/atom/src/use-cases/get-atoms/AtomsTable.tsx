import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { useTablePagination } from '@codelab/frontend-application-shared-store/pagination'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { useColumnSearchProps } from '@codelab/frontend-presentation-view/components'
import { headerCellProps } from '@codelab/frontend-presentation-view/style'
import { Table } from 'antd'
import type { ColumnType } from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ActionColumn } from './columns/ActionColumn'
import { LibraryColumn } from './columns/LibraryColumn'
import { PropsColumn } from './columns/PropsColumn'
import { RequiredParentsColumn } from './columns/RequiredParentsColumn'
import { SuggestedChildrenColumn } from './columns/SuggestedChildrenColumn'
import { TagsColumn } from './columns/TagsColumn'
import { onLibraryFilter } from './dataSource/on-library-filter'

export const AtomsTable = observer(() => {
  const { atomService } = useStore()

  const { data, filter, handleChange, isLoading, pagination } =
    useTablePagination<IAtomModel, { name: string }>({
      filterTypes: { name: 'string' },
      paginationService: atomService.paginationService,
      pathname: PageType.Atoms,
    })

  const nameColumnSearchProps = useColumnSearchProps<IAtomModel>({
    dataIndex: 'name',
    onSearch: (name) =>
      handleChange({ newFilter: { name: name || undefined } }),
    text: filter.name,
  })

  const columns: Array<ColumnType<IAtomModel>> = [
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
      render: (_, atom) => <PropsColumn atom={atom} />,
      title: 'Props API',
      width: 300,
    },
    {
      key: 'action',
      onHeaderCell: headerCellProps,
      render: (text, atom) => <ActionColumn atom={atom} />,
      title: 'Action',
      width: 100,
    },
  ]

  return (
    <Table<IAtomModel>
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={pagination}
      rowKey={(atom) => atom.id}
      scroll={{ y: '80vh' }}
      size="small"
    />
  )
})
