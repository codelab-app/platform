import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import type {
  BaseTypeOptions,
  BaseTypeWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Skeleton } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import type {
  TablePaginationConfig,
  TableRowSelection,
} from 'antd/lib/table/interface'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import { arraySet } from 'mobx-keystone'
import React, { useCallback, useState } from 'react'
import { ActionColumn } from './columns'

interface UseTypesTableParams {
  typeService: ITypeService
  fieldService: IFieldService
  isLoadingTypeDependencies: boolean
}

export const useTypesTable = ({
  fieldService,
  isLoadingTypeDependencies,
  typeService,
}: UseTypesTableParams) => {
  const [baseTypeWhere, setBaseTypeWhere] =
    useState<Maybe<BaseTypeWhere>>(undefined)

  const [baseTypeOptions, setBaseTypeOptions] = useState<BaseTypeOptions>({
    limit: 25,
    offset: 0,
  })

  const debouncedSetBaseTypeWhere = useCallback(
    debounce((value: Maybe<BaseTypeWhere>) => setBaseTypeWhere(value), 1000),
    [],
  )

  const debouncedSetBaseTypeOptions = useCallback(
    debounce((value: BaseTypeOptions) => setBaseTypeOptions(value), 1000),
    [],
  )

  const nameColumnSearchProps = useColumnSearchProps<IAnyType>({
    dataIndex: 'name',
    onSearch: (value) => {
      const where = {
        name: value,
      }

      if (!isEqual(where, baseTypeWhere)) {
        debouncedSetBaseTypeWhere(where)
      }
    },
  })

  const columns: ColumnsType<IAnyType> = [
    {
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      title: 'Name',
      ...nameColumnSearchProps,
    },
    {
      dataIndex: 'kind',
      key: 'kind',
      onHeaderCell: headerCellProps,
      title: 'Kind',
      ...useColumnSearchProps({ dataIndex: 'kind' }),
    },
    {
      key: 'action',
      onHeaderCell: headerCellProps,
      render: (record) => {
        if (isLoadingTypeDependencies) {
          return <Skeleton paragraph={false} />
        }

        return (
          <ActionColumn
            fieldService={fieldService}
            type={record}
            typeService={typeService}
          />
        )
      },
      title: 'Action',
      width: 100,
    },
  ]

  const rowSelection: TableRowSelection<IAnyType> = {
    onChange: (_: Array<React.Key>, selectedRows: Array<IAnyType>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
    type: 'checkbox',
  }

  const pagination: TablePaginationConfig = {
    defaultPageSize: 25,
    onChange: async (page: number, pageSize: number) => {
      const options = {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      }

      if (!isEqual(options, baseTypeOptions)) {
        debouncedSetBaseTypeOptions({
          limit: pageSize,
          offset: (page - 1) * pageSize,
        })
      }
    },
    position: ['bottomCenter'],
    total: typeService.count,
  }

  return {
    baseTypeOptions,
    baseTypeWhere,
    columns,
    pagination,
    rowSelection,
  }
}
