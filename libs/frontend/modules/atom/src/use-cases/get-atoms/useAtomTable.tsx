import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { IAtomService } from '@codelab/shared/abstract/core'
import { TableColumnProps } from 'antd'
import {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import React from 'react'
import { ActionColumn, LibraryColumn, PropsColumn, TagsColumn } from './columns'
import { AtomRecord } from './columns/types'

const onLibraryFilter = (value: any, atom: AtomRecord): boolean => {
  const list = [atom.name, atom.type].map((x) => x.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((x) => x.startsWith(search))
}

export const useAtomTable = (atomService: IAtomService) => {
  // const { data } = useGetTagGraphsQuery()
  // const tagTree = useTagTree(data?.tagGraphs)
  // const tagTreeData = tagTree.getAntdTrees()
  // const filterTreeData = makeFilterData(tagTreeData)

  const columns: Array<TableColumnProps<AtomRecord>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Library',
      dataIndex: 'library',
      key: 'library',
      onHeaderCell: headerCellProps,
      onFilter: onLibraryFilter,
      render: (library) => <LibraryColumn library={library} />,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      onHeaderCell: headerCellProps,
      render: (tags) => <TagsColumn tags={tags} />,
    },
    {
      title: 'Props API',
      dataIndex: 'props',
      key: 'props',
      width: 100,
      onHeaderCell: headerCellProps,
      render: (_, atom) => <PropsColumn atom={atom} />,
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, atom) => (
        <ActionColumn atom={atom} atomService={atomService} />
      ),
    },
  ]

  const rowSelection: TableRowSelection<AtomRecord> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<AtomRecord>) => {
      atomService.setSelectedIds(arraySet(selectedRows.map((a) => a.id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
  }

  return { columns, rowSelection, pagination }
}
