import { ITypeService } from '@codelab/frontend/abstract/core'
import { Table, TablePaginationConfig } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'
import { useGetTypesTableData } from './useGetTypesTableData'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { isLoadingBaseTypes, isloadingTypeDependencies, changePage } =
      useGetTypesTableData(typeService)

    const { columns, rowSelection } = useTypesTable(
      typeService,
      isloadingTypeDependencies,
    )

    useEffect(() => {
      void changePage(1, 10)
    }, [])

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      typeService.entitiesOfCurrentPage?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

    const onPageChange = ({ current, pageSize }: TablePaginationConfig) => {
      return changePage(current || 1, pageSize || 10)
    }

    return (
      <Table<TypeRecord>
        columns={columns}
        dataSource={dataSource}
        loading={isLoadingBaseTypes}
        onChange={onPageChange}
        pagination={{
          position: ['bottomCenter'],
          total: typeService.totalEntitiesCount,
          current: typeService.currentPage,
          pageSize: typeService.pageSize,
        }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
