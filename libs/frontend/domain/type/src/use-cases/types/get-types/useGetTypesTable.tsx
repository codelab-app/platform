import {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { useColumnSearchProps } from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Skeleton } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import React from 'react'
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
  const columns: ColumnsType<IAnyType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('kind'),
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

  return {
    rowSelection,
    columns,
  }
}
