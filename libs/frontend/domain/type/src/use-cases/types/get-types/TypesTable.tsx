import type { IType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { TypeDetailsTable } from './tables/TypeDetailsTable'
import { useTypesTable } from './useTypesTable'

export const TypesTable = observer(() => {
  const { typeService } = useStore()

  const {
    query: { page, pageSize, searchName },
  } = useRouter()

  const { columns, handlePageChange, isLoadingTypes, rowSelection } =
    useTypesTable({
      page: page ? parseInt(page.toString()) : undefined,
      pageSize: pageSize ? parseInt(pageSize.toString()) : undefined,
      searchName: searchName ? searchName.toString() : undefined,
    })

  return (
    <Table<IType>
      columns={columns}
      dataSource={typeService.pagination.types}
      expandable={{
        expandedRowRender: (type) =>
          isLoadingTypes ? <Spin /> : <TypeDetailsTable typeId={type.id} />,
        // onExpand: (expanded, record) => {},
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
