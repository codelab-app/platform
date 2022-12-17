import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Spin, Table } from 'antd'
import type { TableProps } from 'antd/lib/table/Table'
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
    currentPage,
    pageSize,
    entityIdsOfCurrentPage,
    totalEntitiesCount,
    types,
    typesList,
  } = typeService

  const { isLoadingBaseTypes, isLoadingTypeDependencies, getBaseTypes } =
    useGetTypesTableData(typeService)

  const { columns, rowSelection } = useTypesTable({
    typeService,
    isLoadingTypeDependencies,
    fieldService,
  })

  useEffect(() => {
    void getBaseTypes({})
  }, [])

  const onChange: TableProps<IAnyType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    const { current, pageSize: newPageSize } = pagination
    const name = filters.name?.[0]?.toString() ?? ''

    return getBaseTypes({
      page: current,
      pageSize: newPageSize,
      where: {
        name,
      },
    })
  }

  const [rowClassReady, setRowClassReady] = React.useState(false)
  const router = useRouter()

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
        (typeService.entityIdsOfCurrentPage.indexOf(currentType.id) + 1) /
          pageSize,
      )
    }

    if (typeId) {
      const page = findPageOfCurrentType()

      if (page) {
        getBaseTypes({ page, pageSize }).catch(() => undefined)
      }
    }
  }, [typeId, pageSize, entityIdsOfCurrentPage])

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
  }, [typeId, pageSize, rowClassReady, entityIdsOfCurrentPage])

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
      dataSource={typesList.filter((type) =>
        entityIdsOfCurrentPage.includes(type.id),
      )}
      expandable={{
        defaultExpandedRowKeys: [typeId ?? ''],
        expandedRowRender: (type) =>
          isLoadingBaseTypes ? (
            <Spin />
          ) : (
            <NestedTypeTable
              fieldService={fieldService}
              typeId={type.id}
              typeService={typeService}
            />
          ),
      }}
      loading={isLoadingBaseTypes}
      onChange={onChange}
      pagination={{
        position: ['bottomCenter'],
        pageSize,
        current: currentPage,
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
