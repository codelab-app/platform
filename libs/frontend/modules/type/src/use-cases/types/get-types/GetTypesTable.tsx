import { ITypeService } from '@codelab/shared/abstract/core'
import { Table, TablePaginationConfig } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)

    const [{ loading }, queryGetTypesTableTypes] = useAsyncFn(
      (page, pageSize) => typeService.queryGetTypesTableTypes(page, pageSize),
      [],
    )

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      typeService.getTypesTableTypes?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

    const { getTypesTableCurrentPage, getTypesTablePageSize } = typeService

    useEffect(() => {
      void queryGetTypesTableTypes(
        getTypesTableCurrentPage,
        getTypesTablePageSize,
      )
    }, [])

    const onShowSizeChange = ({ current, pageSize }: TablePaginationConfig) => {
      return queryGetTypesTableTypes(current, pageSize)
    }

    return (
      <Table<TypeRecord>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onShowSizeChange}
        pagination={{
          position: ['bottomCenter'],
          total: typeService.getTypesTableTotalCount,
          current: getTypesTableCurrentPage,
        }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
