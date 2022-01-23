import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import { useAppState } from '@codelab/frontend/modules/app'
import { Menu } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const PageDetailHeader = () => {
  const router = useRouter()
  const appId = router.query.appId
  const pageId = router.query.pageId
  const { currentApp } = useAppState()
  const currentPage = currentApp?.pages.find((x) => x.id === pageId)
  const isBuilder = router.pathname === PageType.PageBuilder

  const switchPreviewMode = () => {
    return router.push({
      pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
      query: { appId, pageId },
    })
  }

  return (
    <Menu
      mode="horizontal"
      selectable={false}
      theme="light"
      triggerSubMenuAction="click"
    >
      {currentApp && (
        <SubMenu icon={<FileOutlined />} key="sub1" title={currentPage?.name}>
          {currentApp?.pages.map((page) => (
            <Menu.Item key={page.id}>
              <Link
                href={{
                  pathname: PageType.PageBuilder,
                  query: { appId, pageId: page.id },
                }}
              >
                <a>{page.name}</a>
              </Link>
            </Menu.Item>
          ))}
        </SubMenu>
      )}
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
}
