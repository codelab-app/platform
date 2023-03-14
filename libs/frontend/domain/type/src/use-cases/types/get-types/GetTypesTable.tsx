import type {
  IType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { TypeDetailsTable } from './tables/TypeDetailsTable'
import { useTypesTable } from './useTypesTable'
import { useTypesTableData } from './useTypesTableData'

const DEFAULT_PAGE_SIZE = 25
const DEFAULT_CUR_PAGE = 1

export const GetTypesTable = observer<{
  fieldService: IFieldService
  page?: number
  pageSize?: number
  typeService: ITypeService
}>(({ fieldService, page, pageSize, typeService }) => {
  const { typesList } = typeService
  const router = useRouter()
  const curPage = page ?? DEFAULT_CUR_PAGE
  const curPageSize = pageSize ?? DEFAULT_PAGE_SIZE

  const {
    fetchedTypes,
    getFullType,
    getTypes,
    isLoadingAllTypes,
    loadingFullType,
  } = useTypesTableData(typeService)

  const { columns, pagination, rowSelection } = useTypesTable({
    fieldService,
    isLoadingTypeDependencies: isLoadingAllTypes,
    typeService,
  })

  const handlePageChange = useCallback(
    (newPage: number, newPageSize: number) => {
      void router.push({
        pathname: PageType.Type,
        query: {
          page: newPage,
          pageSize: newPageSize,
        },
      })
    },
    [router],
  )

  /**
   * Change page
   */
  useEffect(() => {
    if (curPage && pageSize) {
      pagination.onChange?.(curPage, pageSize)
    }
  }, [curPage, pageSize, pagination])

  useEffect(() => {
    const offset = (curPage - 1) * curPageSize
    void getTypes({
      limit: curPageSize,
      offset,
    })
  }, [curPage, curPageSize, getTypes])

  const curPageDataStartIndex = typesList.findIndex(
    (type) => type.id === fetchedTypes?.[0]?.id,
  )

  return (
    <Table<IType>
      columns={columns}
      dataSource={typesList.slice(
        curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0,
        (curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0) + curPageSize,
      )}
      expandable={{
        expandedRowRender: (type) =>
          isLoadingAllTypes ? (
            <Spin />
          ) : (
            <TypeDetailsTable
              fieldService={fieldService}
              typeId={type.id}
              typeService={typeService}
            />
          ),
        onExpand: (expanded, record) => {
          if (expanded) {
            void getFullType([record.id])
          }
        },
      }}
      loading={isLoadingAllTypes}
      pagination={{
        ...pagination,
        current: curPage,
        onChange: handlePageChange,
        pageSize: curPageSize,
      }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      scroll={{ x: 'max-content', y: '80vh' }}
      size="small"
    />
  )
})
