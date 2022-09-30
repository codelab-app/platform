import { ITypeService } from '@codelab/shared/abstract/core'
import { Table, TablePaginationConfig } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useAsync, useAsyncFn } from 'react-use'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)

    const [{ loading }, queryGetTypesTableTypes] = useAsyncFn(
      (page, pageSize) => typeService.queryGetTypesTableTypes(page, pageSize),
      [],
    )

    useEffect(() => {
      queryGetTypesTableTypes(1, 10).catch((err) => {
        console.error('Unable to fetch types', err)
      })
    }, [])

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      typeService.getTypesTableTypes?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

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
        }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
