import { TYPE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { TypeRecord } from './columns'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<WithServices<TYPE_SERVICE>>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)

    const [getTypes, { data, isLoading }] = useStatefulExecutor(() =>
      typeService.getAll(),
    )

    useEffect(() => {
      getTypes()
    }, [])

    // Manually build the data for the table because Table is not reactive and
    // this way we ensure it will get re-rendered properly on updates
    const dataSource: Array<TypeRecord> =
      data?.map((t) => ({
        id: t.id,
        name: t.name,
        typeKind: t.kind,
      })) ?? []

    return (
      <Table<TypeRecord>
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
