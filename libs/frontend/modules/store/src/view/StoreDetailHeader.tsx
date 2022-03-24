import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { Page, PageService } from '@codelab/frontend/modules/page'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import { useLoadingState } from '@codelab/frontend/shared/utils'
import { Menu, Spin } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export interface PageDetailHeaderProps {
  pages: PageService
}

export const PageDetailHeader = observer(({ pages }: PageDetailHeaderProps) => {
  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const [getPages, { isLoading }] = useLoadingState(() =>
    pages.getAll({ app: { id: appId } }),
  )

  const pagesList = pages.pagesList

  useEffect(() => {
    getPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        {isLoading && <Spin />}
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
})

interface PageListItemProps {
  page: Page
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
