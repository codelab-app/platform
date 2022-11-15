import {
  DesktopOutlined,
  EyeOutlined,
  FileOutlined,
  MobileOutlined,
  SettingOutlined,
  TabletOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { IBuilderService, IPageService } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import { InputNumber, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import { mainContentWidthBreakPoint } from './constants'

export type MenuItemProps = {
  hide?: boolean
} & ItemType

export const PageDetailHeader = observer<{
  pageService: IPageService
  builderService?: IBuilderService
}>(({ pageService, builderService }) => {
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

  const menuItems: Array<MenuItemProps> = [
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
      hide: false,
    },
    {
      icon: isBuilder ? <EyeOutlined /> : <ToolOutlined />,
      key: '1',
      onClick: switchPreviewMode,
      style: { backgroundColor: 'initial' },
      hide: false,
    },
    {
      icon: <MobileOutlined />,
      key: 'mobile',
      onClick: () => {
        builderService?.setMainContentWidth(mainContentWidthBreakPoint.mobile)
      },
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      icon: <MobileOutlined rotate={-90} />,
      key: 'mobile-vertical',
      onClick: () => {
        builderService?.setMainContentWidth(
          mainContentWidthBreakPoint.mobile_vertical,
        )
      },
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      icon: <TabletOutlined />,
      key: 'tablet-horizontal',
      onClick: () => {
        builderService?.setMainContentWidth(
          mainContentWidthBreakPoint.tablet_horizontal,
        )
      },
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      icon: <DesktopOutlined />,
      key: 'desktop',
      onClick: () => {
        builderService?.setMainContentWidth(null)
      },
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      icon: <SettingOutlined />,
      key: 'sub2',
      children: [
        {
          key: 'custom-width',
          disabled: true,
          icon: (
            <InputNumber
              controls={false}
              min={100}
              onBlur={(e) => {
                builderService?.setMainContentWidth(Number(e.target.value))
              }}
              value={builderService?.mainResizingContentWidth ?? ''}
            />
          ),
          label: 'px',
        },
      ],
      style: { backgroundColor: 'initial' },
      hide: !builderService?.resizingMainContent,
    },
  ]

  return (
    <Menu
      items={menuItems.filter((x) => !x.hide)}
      mode="horizontal"
      selectable={false}
      theme="light"
      triggerSubMenuAction="click"
    />
  )
})
