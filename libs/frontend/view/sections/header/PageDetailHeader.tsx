import { EyeOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

export const PageDetailHeader = () => {
  const router = useRouter()

  const switchPreviewMode = () => {
    const { appId, pageId } = router.query

    return router.push({
      pathname:
        router.pathname === PageType.PageBuilder
          ? PageType.PageDetail
          : PageType.PageBuilder,
      query: { appId, pageId },
    })
  }

  return (
    <Menu theme="light" mode="horizontal" selectable={false}>
      <Menu.Item
        key="1"
        icon={<EyeOutlined />}
        style={{
          backgroundColor: 'initial',
        }}
        onClick={switchPreviewMode}
      />
    </Menu>
  )
}
