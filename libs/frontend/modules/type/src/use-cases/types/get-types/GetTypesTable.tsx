import { ITypeService } from '@codelab/shared/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'
import { getTypeApi, typeApi } from '../../../store'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)
    const { loading, value } = useAsync(() => typeService.getAll(), [])
    useEffect(() => {
      const fn = async () => {
        const api = await getTypeApi.GetTypesTest()
        console.log({ api })
      }

      fn()
    }, [])

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      typeService.typesList?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

    return (
      <Table<TypeRecord>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
