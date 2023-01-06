import type {
  IAnyType,
  IFieldService,
  ITypeService,
} from '@codelab/frontend/abstract/core'
import { Spin, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useState } from 'react'
import { NestedTypeTable } from './NestedTypeTable'
import { useTypesTable } from './useTypesTable'
import { useTypesTableData } from './useTypesTableData'

interface GetTypesTableProps {
  typeService: ITypeService
  fieldService: IFieldService
}

export const GetTypesTable = observer<GetTypesTableProps>(
  ({ typeService, fieldService }) => {
    const [curPage, setCurPage] = useState(1)
    const [curPageSize, setCurPageSize] = useState(25)
    const [sortedTypesList, setSortedTypesList] = useState<Array<IAnyType>>([])

    const [sortedLatestFetchedTypesList, setSortedLatestFetchedTypesList] =
      useState<Array<IAnyType>>([])

    const { typesList } = typeService

    const {
      isLoadingAllTypes,
      value: latestFetchedTypes,
      getAllTypes,
    } = useTypesTableData(typeService)

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
        rowKey={(type) => type.id}
        rowSelection={rowSelection}
        scroll={{ y: '80vh', x: 'max-content' }}
        size="small"
      />
    )
  },
)
