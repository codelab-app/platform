import { EyeOutlined, FileOutlined, ToolOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/store/router'
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
      theme="light"
      mode="horizontal"
      selectable={false}
      triggerSubMenuAction="click"
    >
      {currentApp && (
        <SubMenu key="sub1" icon={<FileOutlined />} title={currentPage?.name}>
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
        key="1"
        icon={isBuilder ? <EyeOutlined /> : <ToolOutlined />}
        style={{
          backgroundColor: 'initial',
        }}
        onClick={switchPreviewMode}
      />
    </Menu>
  )
}
