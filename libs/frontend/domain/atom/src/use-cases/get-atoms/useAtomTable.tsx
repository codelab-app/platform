import { IAtomService } from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import {
  ColumnType,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import { arraySet } from 'mobx-keystone'
import React, { useCallback, useState } from 'react'
import { ActionColumn, LibraryColumn, PropsColumn, TagsColumn } from './columns'
import { AllowedChildrenColumn } from './columns/AllowedChildrenColumn'
import { AtomRecord } from './columns/types'

const onLibraryFilter = (
  value: string | number | boolean,
  atom: AtomRecord,
): boolean => {
  const list = [atom.name, atom.type].map((x) => x.toLowerCase())
  const search = value.toString().toLowerCase()

  return list.some((x) => x.startsWith(search))
}

export const useAtomTable = (atomService: IAtomService) => {
  const [atomWhere, setAtomWhere] = useState<Maybe<AtomWhere>>(undefined)

  const [atomOptions, setAtomOptions] = useState<AtomOptions>({
    offset: 0,
    limit: 25,
  })

  const debouncedSetAtomWhere = useCallback(
    debounce((value: Maybe<AtomWhere>) => setAtomWhere(value), 1000),
    [],
  )

  const debouncedSetAtomOptions = useCallback(
    debounce((value: AtomOptions) => setAtomOptions(value), 1000),
    [],
  )

  const nameColumnSearchProps = useColumnSearchProps<AtomRecord>({
    dataIndex: 'name',
    onSearch: (value) => {
      const where = {
        name_MATCHES: `(?i).*${value}.*`,
      }

      if (!isEqual(where, atomWhere)) {
        debouncedSetAtomWhere(where)
      }
    },
  })

  // const { data } = useGetTagGraphsQuery()
  // const tagTree = useTagTree(data?.tagGraphs)
  // const tagTreeData = tagTree.getAntdTrees()
  // const filterTreeData = makeFilterData(tagTreeData)

  const columns: Array<ColumnType<AtomRecord>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...nameColumnSearchProps,
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
      title: 'Allowed',
      dataIndex: 'allowedChildren',
      key: 'allowedChildren',
      onHeaderCell: headerCellProps,
      render: (allowedChildren) => {
        return <AllowedChildrenColumn allowedChildren={allowedChildren} />
      },
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
    total: atomService.count,
    onChange: async (page: number, pageSize: number) => {
      const options = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      }

      if (!isEqual(options, atomOptions)) {
        debouncedSetAtomOptions({
          offset: (page - 1) * pageSize,
          limit: pageSize,
        })
      }
    },
  }

  return { columns, rowSelection, pagination, atomWhere, atomOptions }
}
