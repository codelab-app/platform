import type {
  IAtomService,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  ColumnType,
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import { arraySet } from 'mobx-keystone'
import React, { useCallback, useMemo, useState } from 'react'
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

export const useAtomTable = ({
  atomService,
  fieldService,
  typeService,
}: {
  atomService: IAtomService
  fieldService: IFieldService
  typeService: ITypeService
}) => {
  const [atomWhere, setAtomWhere] = useState<Maybe<AtomWhere>>(undefined)

  const [atomOptions, setAtomOptions] = useState<AtomOptions>({
    limit: 25,
    offset: 0,
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
        <PropsColumn
          atom={atom}
          fieldService={fieldService}
          typeService={typeService}
        />
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

  const pagination: TablePaginationConfig = useMemo(
    () => ({
      defaultPageSize: 25,
      onChange: async (page: number, pageSize: number) => {
        const options = {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        }

        if (!isEqual(options, atomOptions)) {
          debouncedSetAtomOptions({
            limit: pageSize,
            offset: (page - 1) * pageSize,
          })
        }
      },
      position: ['bottomCenter'],
      total: atomService.count,
    }),
    [],
  )

  return { atomOptions, atomWhere, columns, pagination, rowSelection }
}
