import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { PAGE_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useCurrentPageId } from '@codelab/frontend/presenter/container'
import { IPage } from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const PageDetailHeader = observer<WithServices<PAGE_SERVICE>>(
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

    return (
      <Menu
        mode="horizontal"
        selectable={false}
        theme="light"
        triggerSubMenuAction="click"
      >
        <SubMenu icon={<FileOutlined />} key="sub1" title={currentPage?.name}>
          {pagesList?.map((page) => (
            <PageListItem key={page.id} page={page} />
          ))}
        </SubMenu>
        <Menu.Item
          icon={isBuilder ? <EyeOutlined /> : <ToolOutlined />}
          key="1"
          onClick={switchPreviewMode}
          style={{
            backgroundColor: 'initial',
          }}
        />
      </Menu>
    )
  },
)

interface PageListItemProps {
  page: IPage
}

const PageListItem = observer<PageListItemProps>(({ page }) => {
  const router = useRouter()

  return (
    <Menu.Item key={page.id}>
      <Link
        href={{
          pathname: PageType.PageBuilder,
          query: { ...router.query, pageId: page?.id },
        }}
      >
        <a>{page?.name}</a>
      </Link>
    </Menu.Item>
  )
})
