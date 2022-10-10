import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { IPageService } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import { Menu, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'

export const PageDetailHeader = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const router = useRouter()
    const currentAppId = useCurrentAppId()
    const pageId = useCurrentPageId()

    const pagesList = pageService.pagesList.filter(
      (p) => p.app.id === currentAppId,
    )

    const currentPage = pagesList.find((x) => x.id === pageId)
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
        children: pagesList.map((page) => ({
          key: page.id,
          label: <span>{page.name}</span>,
          onClick: () =>
            router.push(
              {
                pathname: PageType.PageBuilder,
                query: { ...router.query, pageId: page.id },
              },
              undefined,
              { shallow: false },
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
