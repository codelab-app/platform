import { ITypeService } from '@codelab/shared/abstract/core'
import { Table, TablePaginationConfig } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useAsyncFn } from 'react-use'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)

    const [{ loading, value }, getTypesOfTypesPage] = useAsyncFn(
      (page, pageSize) => typeService.getTypesOfTypesPage(page, pageSize),
      [],
    )

    useEffect(() => {
      getTypesOfTypesPage(1, 10).catch((err) => {
        console.error('Unable to fetch types', err)
      })
    }, [])

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      typeService.typesOfTypesPage?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

    const onShowSizeChange = ({ current, pageSize }: TablePaginationConfig) => {
      return getTypesOfTypesPage(current, pageSize)
    }

    return (
      <Table<TypeRecord>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        /**
         * nghia
         * onShowSizeChange(current,size)
         *
         */
        onChange={onShowSizeChange}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 10,
          // total: typeService.totalcountTypesOfTypesPage,
          total: typeService.totalcountTypesOfTypesPage,
        }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
