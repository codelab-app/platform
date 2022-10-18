import { ITypeRecord, ITypeService } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    const { columns, rowSelection } = useTypesTable(typeService)
    const { loading, value } = useAsync(() => typeService.getAll(), [])

    return (
      <Table<ITypeRecord>
        columns={columns}
        dataSource={typeService.data}
        loading={loading}
        pagination={{ position: ['bottomCenter'] }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        size="small"
      />
    )
  },
)
