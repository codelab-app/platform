import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { IPageService } from '@codelab/shared/abstract/core'
import { Menu, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const PageDetailHeader = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const router = useRouter()
    const pageId = useCurrentPageId()
    const pagesList = pageService.pagesList
    const currentPage = pagesList?.find((x) => x?.id === pageId)
    const isBuilder = router.pathname === PageType.PageBuilder

    const switchPreviewMode = () => {
      return router.push({
        pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
        query: router.query,
      })
    }

    const menuItems: MenuProps['items'] = [
      {
        icon: <FileOutlined />,
        key: 'sub1',
        title: currentPage?.name,
        children: pagesList?.map((page) => ({
          key: page.id,
          label: (
            <Link
              href={{
                pathname: PageType.PageBuilder,
                query: { ...router.query, pageId: page?.id },
              }}
            >
              <a>{page?.name}</a>
            </Link>
          ),
        })),
      },
      {
        icon: isBuilder ? <EyeOutlined /> : <ToolOutlined />,
        key: '1',
        onClick: switchPreviewMode,
        style: { backgroundColor: 'initial' },
      },
    ]

    return (
      <Menu
        items={menuItems}
        mode="horizontal"
        selectable={false}
        theme="light"
        triggerSubMenuAction="click"
      />
    )
  },
)
