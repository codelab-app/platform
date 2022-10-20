import {
  IFieldService,
  ITypeRecord,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useAsync } from 'react-use'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useGetTypesTable'

export const GetTypesTable = observer<{
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeService, fieldService }) => {
  const { columns, rowSelection } = useTypesTable(typeService)
  const { loading } = useAsync(() => typeService.getAll(), [])

  return (
    <Table<ITypeRecord>
      columns={columns}
      dataSource={typeService.data}
      expandable={{
        expandedRowRender: (type) => (
          <NestedTypeTable
            fieldService={fieldService}
            typeId={type.id}
            typeService={typeService}
          />
        ),
      }}
      loading={loading}
      pagination={{ position: ['bottomCenter'] }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ y: '80vh', x: 'max-content' }}
      size="small"
    />
  )
})
