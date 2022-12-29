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
import scrollIntoView from 'scroll-into-view'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useTypesTable'
import { useTypesTableData } from './useTypesTableData'

const SCROLL_ROW_CLASS_NAME = 'scroll-row'

export const GetTypesTable = observer<{
  typeId?: string
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeId, typeService, fieldService }) => {
  const { types, typesList } = typeService
  const { isLoadingAllTypes, getAllTypes } = useTypesTableData(typeService)
  const [curPage, setCurPage] = useState(1)
  const [curPageSize, setCurPageSize] = useState(25)
  const [rowClassReady, setRowClassReady] = React.useState(false)
  const router = useRouter()

  const { columns, rowSelection, baseTypeOptions, baseTypeWhere, pagination } =
    useTypesTable({
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
    void getAllTypes(
      {
        name: baseTypeWhere?.name ?? '',
        id_IN: [typeId ?? ''],
      },
      {
        offset: baseTypeOptions.offset ?? undefined,
        limit: baseTypeOptions.limit ?? undefined,
      },
    )
  }, [baseTypeOptions, baseTypeWhere, getAllTypes, typeId])

  /**
   * Change the current page to the page containing the current type
   */
  useEffect(() => {
    const findPageOfCurrentType = () => {
      const currentType = types.get(typeId ?? '')

      if (!currentType) {
        return
      }

      return Math.ceil(
        (typesList.findIndex((t) => t.id === currentType.id) + 1) / curPageSize,
      )
    }

    if (typeId) {
      const page = findPageOfCurrentType()

      if (page) {
        handlePageChange(page, curPageSize)

        /**
         * Removing the current type id from the url because there is no use for it anymore
         */
        router.push(PageType.Type).catch((e) => console.error(e))
      }
    }
  }, [router, typeId, typesList, types, curPageSize, handlePageChange])

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

  const currentPageTypes = typesList.length
    ? typesList.slice((curPage - 1) * curPageSize, curPage * curPageSize)
    : []

  return (
    <Table<IAnyType>
      columns={columns}
      dataSource={currentPageTypes}
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
      loading={isLoadingAllTypes}
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
})
