import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useAsyncFn } from 'react-use'
import scrollIntoView from 'scroll-into-view'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useTypesTable'
import { useTypesTableData } from './useTypesTableData'

const SCROLL_ROW_CLASS_NAME = 'scroll-row'

interface GetTypesTableProps {
  typeId?: string
  typeService: ITypeService
  fieldService: IFieldService
}

export const GetTypesTable = observer<GetTypesTableProps>(
  ({ typeId, typeService, fieldService }) => {
    const [curPage, setCurPage] = useState(1)
    const [curPageSize, setCurPageSize] = useState(25)
    const [rowClassReady, setRowClassReady] = useState(false)
    const router = useRouter()
    const [sortedTypesList, setSortedTypesList] = useState<Array<IAnyType>>([])

    const [sortedLatestFetchedTypesList, setSortedLatestFetchedTypesList] =
      useState<Array<IAnyType>>([])

    const { typesList } = typeService

    const {
      isLoadingAllTypes,
      value: latestFetchedTypes,
      getAllTypes,
    } = useTypesTableData(typeService)

    const [
      { loading: isTypeOffsetLoading, value: curTypeOffset },
      getTypeOffset,
    ] = useAsyncFn(typeService.getBaseTypeOffset.bind(typeService), [])

    const {
      columns,
      rowSelection,
      baseTypeOptions,
      baseTypeWhere,
      pagination,
    } = useTypesTable({
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
      [setCurPage, pagination],
    )

    useEffect(() => {
      const sorted = typesList.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0,
      )

      setSortedTypesList(sorted)
    }, [setSortedTypesList, typesList])

    useEffect(() => {
      if (latestFetchedTypes) {
        const sorted = latestFetchedTypes.sort((a, b) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0,
        )

        setSortedLatestFetchedTypesList(sorted)
      }
    }, [setSortedLatestFetchedTypesList, latestFetchedTypes])

    useEffect(() => {
      void getAllTypes(
        {
          name: baseTypeWhere?.name ?? '',
        },
        {
          offset: baseTypeOptions.offset ?? undefined,
          limit: baseTypeOptions.limit ?? undefined,
        },
      )
    }, [getAllTypes, baseTypeOptions, baseTypeWhere])

    /**
     * Get the offset of the current type
     */
    useEffect(() => {
      if (typeId) {
        void getTypeOffset({ id: typeId })

        /**
         * Removing the current type id from the url because there is no use for it anymore
         */
        void router.push(PageType.Type)
      }
    }, [typeId, getTypeOffset, router])

    /**
     * Change the current page to the page containing
     * the current type using its offset
     */
    useEffect(() => {
      if (curTypeOffset) {
        handlePageChange(
          Math.ceil((curTypeOffset + 1) / curPageSize),
          curPageSize,
        )
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curTypeOffset])

    /**
     * Scroll to the current type to make sure it is visible
     */
    useEffect(() => {
      const scrollRow = document.querySelector(`.${SCROLL_ROW_CLASS_NAME}`)

      if (scrollRow) {
        scrollIntoView(scrollRow as HTMLElement, {
          align: {
            top: 0,
          },
        })
      }
    }, [typeId, rowClassReady])

    const curPageDataStartIndex = sortedTypesList.findIndex(
      (t) => t.id === sortedLatestFetchedTypesList[0]?.id,
    )

    return (
      <Table<IAnyType>
        columns={columns}
        dataSource={sortedTypesList.slice(
          curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0,
          (curPageDataStartIndex >= 0 ? curPageDataStartIndex : 0) +
            curPageSize,
        )}
        expandable={{
          defaultExpandedRowKeys: [typeId ?? ''],
          expandedRowRender: (type) =>
            isLoadingAllTypes ? (
              <Spin />
            ) : (
              <NestedTypeTable
                fieldService={fieldService}
                typeId={type.id}
                typeService={typeService}
              />
            ),
        }}
        loading={isLoadingAllTypes || isTypeOffsetLoading}
        pagination={{
          ...pagination,
          current: curPage,
          pageSize: curPageSize,
          onChange: handlePageChange,
        }}
        rowClassName={(record) => {
          if (record.id === typeId) {
            setRowClassReady(true)

            return SCROLL_ROW_CLASS_NAME
          }

          return ''
        }}
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        scroll={{ y: '80vh', x: 'max-content' }}
        size="small"
      />
    )
  },
)
