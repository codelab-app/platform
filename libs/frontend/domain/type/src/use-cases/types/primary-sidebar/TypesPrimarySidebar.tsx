import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { IType } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  CuiInput,
  CuiSidebar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { useTablePagination } from '@codelab/frontend/shared/utils'
import React from 'react'
import tw from 'twin.macro'
import { TypesTreeView } from '../get-types'

export const TypesPrimarySidebar = () => {
  const { typeService } = useStore()

  const { data, filter, handleChange, isLoading, pagination } =
    useTablePagination<IType, { name: string }>({
      filterTypes: { name: 'string' },
      paginationService: typeService.paginationService,
      pathname: PageType.Type,
    })

  const pageCount = 20
  const pageSize = 50

  return (
    <CuiSidebar
      defaultActiveViewKeys={['types-view']}
      label="Types"
      views={[
        {
          content: <TypesTreeView />,
          key: 'types-view',
          label: 'Types',
          toolbar: {
            items: [
              {
                icon: <LeftOutlined />,
                key: 'previous',
                onClick: () => {
                  pagination.onChange?.(
                    (pagination.current ?? 2) - 1,
                    pagination.pageSize || pageSize,
                  )
                },
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
                          pagination.onChange?.(
                            value,
                            pagination.pageSize || pageSize,
                          )
                        }
                      }}
                      type="number"
                      value={pagination.current}
                    />
                    <span
                      css={tw`
                      w-2
                      p-0
                      m-0
                      text-sm
                    `}
                    >
                      /
                    </span>
                    <span
                      css={tw`
                        w-6
                        p-0
                        m-0
                        text-sm
                      `}
                    >
                      {`${pageCount}`}
                    </span>
                  </div>
                ),
                key: 'current-page',
                title: `Current page: ${pagination.current} / ${pageCount}`,
              },
              {
                icon: <RightOutlined />,
                key: 'next',
                onClick: () => {
                  pagination.onChange?.(
                    (pagination.current ?? 1) + 1,
                    pagination.pageSize || pageSize,
                  )
                },
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
                          pagination.onChange?.(pagination.current ?? 1, value)
                        }
                      }}
                      type="number"
                      value={pagination.pageSize || pageSize}
                    />
                    <span
                      css={tw`
                  w-2
                  p-0
                  m-0
                  text-sm
                `}
                    >
                      /
                    </span>
                    <span
                      css={tw`
                    w-6
                    p-0
                    m-0
                    text-sm
                  `}
                    >
                      Page
                    </span>
                  </div>
                ),
                key: 'page-size',
                title: `${pagination.pageSize} items per page`,
              },
            ],
            title: 'types-tree-toolbar',
          },
        },
      ]}
    />
  )
}
