import { LeftOutlined, RightOutlined, SearchOutlined } from '@ant-design/icons'
import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CuiInput,
  CuiSidebar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { TypesTreeView } from '../get-types'

export const TypesPrimarySidebar = observer(() => {
  const { typeService } = useStore()

  const { handleChange, pagination } = useTablePagination<
    IType,
    { name: string }
  >({
    filterTypes: { name: 'string' },
    paginationService: typeService.paginationService,
    pathname: PageType.Type,
  })

  const { current, pageSize } = pagination
  const [currentPage, setCurrentPage] = useState(current ?? 1)
  const [currentPageSize, setCurrentPageSize] = useState(pageSize ?? 50)
  const [showSearchBar, setShowSearchBar] = useState(false)

  const pageCount = Math.ceil(
    typeService.paginationService.totalItems / currentPageSize,
  )

  useEffect(() => {
    if (current) {
      setCurrentPage(current)
    }

    if (pageSize) {
      setCurrentPageSize(pageSize)
    }
  }, [current, pageSize])

  const changePageSize = (newPageSize: number) => {
    setCurrentPageSize(newPageSize)
    void handleChange({ newPageSize })
  }

  const goToPage = (page: number) => {
    if (page > 0 && page <= pageCount) {
      setCurrentPage(page)
      void handleChange({ newPage: page })
    }
  }

  const goToPreviousPage = () => {
    goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    goToPage(currentPage + 1)
  }

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
      views={[
        {
          content: <TypesTreeView showSearchBar={showSearchBar} />,
          key: 'types-view',
          label: 'Types',
          toolbar: {
            items: [
              {
                icon: <LeftOutlined />,
                key: 'previous',
                onClick: goToPreviousPage,
                title: 'Previous',
              },
              {
                icon: (
                  <div className="flex w-16 flex-row items-center justify-between">
                    <CuiInput
                      onChange={(value) => {
                        if (typeof value === 'number' && value > 0) {
                          goToPage(value)
                        }
                      }}
                      selectAllOnClick
                      type="number"
                      value={currentPage}
                    />
                    <span className="m-0 w-2 p-0 text-center text-sm">/</span>
                    <span className="m-0 w-6 p-0 text-center text-sm">{`${pageCount}`}</span>
                  </div>
                ),
                key: 'current-page',
                title: `Current page: ${currentPage} / ${pageCount}`,
              },
              {
                icon: <RightOutlined />,
                key: 'next',
                onClick: goToNextPage,
                title: 'Next',
              },
              {
                icon: (
                  <div className="flex w-16 flex-row items-center justify-between">
                    <CuiInput
                      onChange={(value) => {
                        if (typeof value === 'number' && value > 0) {
                          changePageSize(value)
                        }
                      }}
                      selectAllOnClick
                      type="number"
                      value={currentPageSize}
                    />
                    <span className="m-0 w-2 p-0 text-sm">/</span>
                    <span className="m-0 p-0 text-sm">Page</span>
                  </div>
                ),
                key: 'page-size',
                title: `${currentPageSize} items per page`,
              },
              {
                icon: <SearchOutlined />,
                key: 'search',
                onClick: () => setShowSearchBar(!showSearchBar),
                title: 'Search',
              },
            ],
            title: 'types-tree-toolbar',
          },
        },
      ]}
    />
  )
})
