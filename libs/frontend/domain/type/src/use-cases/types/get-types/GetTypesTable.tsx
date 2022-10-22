import {
  IFieldService,
  ITypeRecord,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'
import scrollIntoView from 'scroll-into-view'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useGetTypesTable'

const SCROLL_ROW_CLASS_NAME = 'scroll-row'
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE = 1

export const GetTypesTable = observer<{
  typeId?: string
  typeService: ITypeService
  fieldService: IFieldService
}>(({ typeId, typeService, fieldService }) => {
  const { columns, rowSelection } = useTypesTable(typeService, fieldService)
  const { loading } = useAsync(() => typeService.getAll(), [])
  const [curTypeId] = React.useState(typeId)
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE)
  const [currentPage, setCurrentPage] = React.useState(DEFAULT_PAGE)
  const [rowClassReady, setRowClassReady] = React.useState(false)
  const router = useRouter()

  /**
   * Chane the current page to the page containing the current type
   */
  useEffect(() => {
    const findPageOfCurrentType = () =>
      Math.ceil(
        (typeService.data.indexOf(
          typeService.data.find((t) => t.id === curTypeId) as ITypeRecord,
        ) +
          1) /
          pageSize,
      )

    if (curTypeId) {
      const page = findPageOfCurrentType()
      setCurrentPage(page)
    }
  }, [curTypeId, pageSize, typeService.data])

  /**
   * Scroll to the current type
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
  }, [curTypeId, pageSize, rowClassReady, currentPage])

  /**
   * remove current type id from url
   */
  useEffect(() => {
    if (typeId) {
      router.push(PageType.Type).catch((e) => console.error(e))
    }
  }, [router, typeId])

  return (
    <Table<ITypeRecord>
      columns={columns}
      dataSource={typeService.data}
      expandable={{
        defaultExpandedRowKeys: [curTypeId ?? ''],
        expandedRowRender: (type) => (
          <NestedTypeTable
            fieldService={fieldService}
            typeId={type.id}
            typeService={typeService}
          />
        ),
      }}
      loading={loading}
      onChange={(pagination) => {
        setPageSize(pagination.pageSize || pageSize)
        setCurrentPage(pagination.current || currentPage)
      }}
      pagination={{
        position: ['bottomCenter'],
        pageSize,
        current: currentPage,
      }}
      rowClassName={(record) => {
        if (record.id === curTypeId) {
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
