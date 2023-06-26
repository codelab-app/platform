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
import tw from 'twin.macro'
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
                icon: <SearchOutlined />,
                key: 'search',
                onClick: () => setShowSearchBar(!showSearchBar),
                title: 'Search',
              },
              {
                icon: <LeftOutlined />,
                key: 'previous',
                onClick: goToPreviousPage,
                title: 'Previous',
              },
              {
                icon: (
                  <div
                    css={tw`w-16 flex flex-row justify-between items-center`}
                  >
                    <CuiInput
                      onChange={(value) => {
                        if (typeof value === 'number' && value > 0) {
                          goToPage(value)
                        }
                      }}
                      type="number"
                      value={currentPage}
                    />
                    <span css={tw`w-2 p-0 m-0 text-sm`}>/</span>
                    <span css={tw`w-6 p-0 m-0 text-sm`}>{`${pageCount}`}</span>
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
                  <div
                    css={tw`w-16 flex flex-row justify-between items-center`}
                  >
                    <CuiInput
                      onChange={(value) => {
                        if (typeof value === 'number' && value > 0) {
                          changePageSize(value)
                        }
                      }}
                      type="number"
                      value={currentPageSize}
                    />
                    <span css={tw`w-2 p-0 m-0 text-sm`}>/</span>
                    <span css={tw`w-6 p-0 m-0 text-sm`}>Page</span>
                  </div>
                ),
                key: 'page-size',
                title: `${currentPageSize} items per page`,
              },
            ],
            title: 'types-tree-toolbar',
          },
        },
      ]}
    />
  )
})
