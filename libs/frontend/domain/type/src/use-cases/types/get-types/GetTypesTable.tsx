import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { Spin, Table } from 'antd'
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
  const { types, typesList } = typeService
  const { isLoadingAllTypes, getAllTypes } = useGetTypesTableData(typeService)
  // const [curPage, setCurPage] = useState(1)

  const { columns, rowSelection, baseTypeOptions, baseTypeWhere, pagination } =
    useTypesTable({
      typeService,
      isLoadingTypeDependencies: isLoadingAllTypes,
      fieldService,
    })

  useEffect(() => {
    void getAllTypes(
      {
        name: baseTypeWhere?.name ?? undefined,
      },
      {
        offset: baseTypeOptions.offset ?? undefined,
        limit: baseTypeOptions.limit ?? undefined,
      },
    )
  }, [baseTypeOptions, baseTypeWhere, getAllTypes])

  const [rowClassReady, setRowClassReady] = React.useState(false)
  const router = useRouter()

  // /**
  //  * Change the current page to the page containing the current type
  //  */
  // useEffect(() => {
  //   const findPageOfCurrentType = () => {
  //     const currentType = types.get(typeId ?? '')

  //     if (!currentType) {
  //       return
  //     }

  //     return Math.ceil(
  //       (typeService.typesList.findIndex((t) => t.id === currentType.id) + 1) /
  //         // TODO: CHANGE THIS!!
  //         25,
  //     )
  //   }

  //   if (typeId) {
  //     const page = findPageOfCurrentType()

  //     if (page) {
  //       setCurPage(page)
  //       getAllTypes().catch(() => undefined)
  //     }
  //   }
  // }, [typeId, typeService.typesList, types])

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
      dataSource={typesList}
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
      pagination={pagination}
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
