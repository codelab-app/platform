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
  typeService,
  isLoadingTypeDependencies,
  fieldService,
}: UseTypesTableParams) => {
  const [baseTypeWhere, setBaseTypeWhere] =
    useState<Maybe<BaseTypeWhere>>(undefined)

  const [baseTypeOptions, setBaseTypeOptions] = useState<BaseTypeOptions>({
    offset: 0,
    limit: 25,
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...nameColumnSearchProps,
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps({ dataIndex: 'kind' }),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
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
    },
  ]

  const rowSelection: TableRowSelection<IAnyType> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<IAnyType>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
  }

  const pagination: TablePaginationConfig = {
    position: ['bottomCenter'],
    defaultPageSize: 25,
    onChange: async (page: number, pageSize: number) => {
      const options = {
        offset: (page - 1) * pageSize,
        limit: pageSize,
      }

      if (!isEqual(options, baseTypeOptions)) {
        debouncedSetBaseTypeOptions({
          offset: (page - 1) * pageSize,
          limit: pageSize,
        })
      }
    },
  }

  return {
    rowSelection,
    columns,
    pagination,
    baseTypeWhere,
    baseTypeOptions,
  }
}
