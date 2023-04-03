import type { IType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TypeDetailsTable } from './tables/TypeDetailsTable'
import { useTypesTable } from './useTypesTable'

export const TypesTable = observer(() => {
  const { typeService } = useStore()

  const {
    columns,
    currentData,
    handlePageChange,
    isLoadingTypes,
    rowSelection,
  } = useTypesTable()

  return (
    <Table<IType>
      columns={columns}
      dataSource={currentData}
      expandable={{
        expandedRowRender: (type) =>
          isLoadingTypes ? <Spin /> : <TypeDetailsTable typeId={type.id} />,
      }}
      loading={isLoadingTypes}
      pagination={{
        current: typeService.pagination.currentPage,
        onChange: handlePageChange,
        pageSize: typeService.pagination.pageSize,
        position: ['bottomCenter'],
        total: typeService.pagination.total,
      }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ x: 'max-content', y: '80vh' }}
      size="small"
    />
  )
})
