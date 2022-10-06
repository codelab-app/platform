import {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Table, TablePaginationConfig } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import scrollIntoView from 'scroll-into-view'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useGetTypesTable'
import { useGetTypesTableData } from './useGetTypesTableData'

const SCROLL_ROW_CLASS_NAME = 'scroll-row'

export const GetTypesTable = observer<{
  typeId?: string
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeId, typeService, fieldService }) => {
  const {
    pageSize,
    currentLoadedPage,
    refetchCurrentPage,
    totalEntitiesCount,
    entitiesOfCurrentPage,
  } = typeService

  const { isLoadingBaseTypes, isloadingTypeDependencies, changePage } =
    useGetTypesTableData(typeService)

  const { columns, rowSelection } = useTypesTable({
    typeService,
    isloadingTypeDependencies,
    fieldService,
  })

  useEffect(() => {
    void typeService.refetchCurrentPage().catch(() => undefined)
  }, [])

  const onPageChange = ({
    current: newPage,
    pageSize: newPageSize,
  }: TablePaginationConfig) => {
    return changePage(newPage || currentLoadedPage, newPageSize || pageSize)
  }

  const [rowClassReady, setRowClassReady] = React.useState(false)
  const router = useRouter()

  /**
   * Change the current page to the page containing the current type
   */
  useEffect(() => {
    const findPageOfCurrentType = () => {
      const currentType = entitiesOfCurrentPage.find(
        (t: IAnyType) => t.id === typeId,
      )

      if (!currentType) {
        return
      }

      return Math.ceil(
        (entitiesOfCurrentPage.indexOf(currentType) + 1) / pageSize,
      )
    }

    if (typeId) {
      const page = findPageOfCurrentType()

      if (page) {
        changePage(page, pageSize).catch(() => undefined)
      }
    }
  }, [typeId, pageSize, entitiesOfCurrentPage])

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
  }, [typeId, pageSize, rowClassReady, entitiesOfCurrentPage])

  /**
   * remove current type id from url
   */
  useEffect(() => {
    if (typeId) {
      router.push(PageType.Type).catch((e) => console.error(e))
    }
  }, [router, typeId])

  return (
    <Table<IAnyType>
      columns={columns}
      dataSource={entitiesOfCurrentPage}
      expandable={{
        defaultExpandedRowKeys: [typeId ?? ''],
        expandedRowRender: (type) => (
          <NestedTypeTable
            fieldService={fieldService}
            typeId={type.id}
            typeService={typeService}
          />
        ),
      }}
      loading={isLoadingBaseTypes}
      onChange={onPageChange}
      pagination={{
        position: ['bottomCenter'],
        pageSize,
        current: currentLoadedPage,
        total: totalEntitiesCount,
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
