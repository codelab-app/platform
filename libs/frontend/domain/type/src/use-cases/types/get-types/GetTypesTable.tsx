import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { TypeDetailsTable } from './tables/TypeDetailsTable'
import { useTypesTable } from './useTypesTable'
import { useTypesTableData } from './useTypesTableData'

export const GetTypesTable = observer<{
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeService, fieldService }) => {
  const { typesList } = typeService

  const {
    isLoadingAllTypes,
    getBaseTypes,
    fetchedBaseTypes,
    isLoadingTypeDescendants,
    getTypeDescendants,
  } = useTypesTableData(typeService)

  const [curPage, setCurPage] = useState(1)
  const [curPageSize, setCurPageSize] = useState(25)

  const { columns, rowSelection, pagination } = useTypesTable({
    typeService,
    isLoadingTypeDependencies: isLoadingAllTypes,
    fieldService,
  })

  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      setCurPage(page)
      setCurPageSize(pageSize)
      pagination.onChange?.(page, pageSize)
    },
    [pagination, setCurPage],
  )

  useEffect(() => {
    const offset = (curPage - 1) * curPageSize
    void getBaseTypes({
      offset,
      limit: curPageSize,
    })
  }, [curPage, curPageSize, getBaseTypes])

  const curPageDataStartIndex = typesList.findIndex(
    (t) => t.id === fetchedBaseTypes?.[0]?.id,
  )

  return (
    <Table<IAnyType>
      columns={columns}
      dataSource={typesList.slice(
        curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0,
        (curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0) + curPageSize,
      )}
      expandable={{
        onExpand: async (expanded, record) => {
          if (expanded) {
            await getTypeDescendants(record.id)
          }
        },
        expandedRowRender: (type) =>
          isLoadingAllTypes || isLoadingTypeDescendants ? (
            <Spin />
          ) : (
            <TypeDetailsTable
              fieldService={fieldService}
              typeId={type.id}
              typeService={typeService}
            />
          ),
      }}
      loading={isLoadingAllTypes}
      pagination={{
        ...pagination,
        current: curPage,
        pageSize: curPageSize,
        onChange: handlePageChange,
      }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ y: '80vh', x: 'max-content' }}
      size="small"
    />
  )
})
