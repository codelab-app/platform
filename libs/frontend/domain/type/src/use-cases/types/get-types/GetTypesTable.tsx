import type {
  IAnyType,
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
  typeService: ITypeService
  fieldService: IFieldService
  page?: number
  pageSize?: number
}>(({ typeService, fieldService, page, pageSize }) => {
  const { typesList } = typeService
  const router = useRouter()
  const curPage = page ?? DEFAULT_CUR_PAGE
  const curPageSize = pageSize ?? DEFAULT_PAGE_SIZE

  const {
    isLoadingAllTypes,
    getBaseTypes,
    isLoadingTypeDescendants,
    getTypeDescendants,
  } = useTypesTableData(typeService)

  const { columns, rowSelection, pagination } = useTypesTable({
    typeService,
    isLoadingTypeDependencies: isLoadingAllTypes,
    fieldService,
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

  const loadAllBaseTypes = useCallback(
    async (pagesize: number) => {
      let callCounter = 0

      while (callCounter < 2) {
        await getBaseTypes({
          offset: 0,
          limit: callCounter === 0 ? pagesize : typeService.count,
        })
        callCounter++
      }
    },
    [curPageSize],
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
    void loadAllBaseTypes(curPageSize)
  }, [curPageSize])

  return (
    <Table<IAnyType>
      columns={columns}
      dataSource={typesList}
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
