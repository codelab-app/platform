import {
  DesktopOutlined,
  EyeOutlined,
  FileOutlined,
  MobileOutlined,
  TabletOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import {
  BuilderWidthBreakPoints,
  defaultBuilderWidthBreakPoints,
} from '@codelab/frontend/abstract/core'
import { ExplorerPaneType, PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import tw from 'twin.macro'

export type MenuItemProps = ItemType & {
  hide?: boolean
}

export const PageDetailHeader = observer(() => {
  const { appService, builderService, pageService } = useStore()
  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()
  const pagesList = pageService.pagesByApp(appId)
  const currentPage = pagesList.find((page) => page.id === pageId)
  const isBuilder = router.pathname === PageType.PageBuilder

  const appName = useMemo(
    () => (appId ? appService.app(appId)?.name : ''),
    [appId],
  )

  const pageName = useMemo(
    () => (currentPage?.id ? pageService.page(currentPage.id)?.name : ''),
    [currentPage],
  )

  const switchPreviewMode = () => {
    return router.push({
      pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
      query: router.query,
    })
  }

  const navigatePagesPanel = useCallback(async () => {
    await router.push({ pathname: PageType.PageList, query: router.query })
  }, [router])

  const [selectedWidthBreakpoint, setSelectedWidthBreakpoint] = useState(
    BuilderWidthBreakPoints.Desktop,
  )

  const handleBreakpointSelected = useCallback(
    (breakpoint: BuilderWidthBreakPoints) => {
      setSelectedWidthBreakpoint(breakpoint)
      builderService.setSelectedBuilderWidth(
        defaultBuilderWidthBreakPoints[breakpoint],
      )
    },
    [],
  )

  const menuItems: Array<MenuItemProps> = [
    {
      children: pagesList.map((page) => ({
        key: page.id,
        label: <span>{page.name}</span>,
        onClick: () =>
          router.push(
            {
              pathname: PageType.PageBuilder,
              query: {
                ...router.query,
                explorerPaneKey: ExplorerPaneType.Explorer,
                pageId: page.id,
              },
            },
            undefined,
            { shallow: false },
          ),
      })),
      hide: false,
      key: 'sub1',
      label: <FileOutlined />,
      title: currentPage?.name,
    },
    {
      hide: false,
      key: '1',
      label: isBuilder ? <EyeOutlined /> : <ToolOutlined />,
      onClick: switchPreviewMode,
      style: { backgroundColor: 'initial' },
      title: isBuilder ? 'Preview' : 'Builder',
    },
    {
      hide: !isBuilder,
      key: BuilderWidthBreakPoints.Mobile,
      label: <MobileOutlined />,
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Mobile),
      style: { backgroundColor: 'initial' },
      title: 'mobile',
    },
    {
      hide: !isBuilder,
      key: BuilderWidthBreakPoints.MobileVertical,
      label: <MobileOutlined rotate={-90} />,
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.MobileVertical),
      style: { backgroundColor: 'initial' },
      title: 'mobile vertical',
    },
    {
      hide: !isBuilder,
      key: BuilderWidthBreakPoints.TabletHorizontal,
      label: <TabletOutlined />,
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.TabletHorizontal),
      style: { backgroundColor: 'initial' },
      title: 'tablet horizontal',
    },
    {
      hide: !isBuilder,
      key: BuilderWidthBreakPoints.Desktop,
      label: <DesktopOutlined />,
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Desktop),
      style: { backgroundColor: 'initial' },
      title: 'desktop',
    },
    {
      hide: !isBuilder,
      key: 'custom',
      label: (
        <Space direction="horizontal" size="small">
          <InputNumber
            controls={false}
            max={builderService.selectedBuilderWidth.max}
            min={builderService.selectedBuilderWidth.min}
            onChange={(value) =>
              builderService.setSelectedBuilderWidth({
                ...builderService.selectedBuilderWidth,
                default: Number(value),
              })
            }
            size="small"
            value={builderService.currentBuilderWidth.default}
          />
          <span>px</span>
        </Space>
      ),
      style: { backgroundColor: 'initial' },
      title: 'custom size',
    },
  ]

  return (
    <div css={tw`bg-white relative`}>
      <div
        css={tw`absolute left-3 flex items-center flex-row h-full cursor-pointer`}
        onClick={navigatePagesPanel}
      >
        <img alt="" css={tw`w-6 mr-2`} src="/logo.png" />
        {`${appName} - ${pageName}`}
      </div>
      <Menu
        css={tw`flex justify-center`}
        items={menuItems
          .filter((item) => !item.hide)
          .map((item) => ({
            ...item,
            hide: String(item.hide),
          }))}
        mode="horizontal"
        selectable={false}
        selectedKeys={[selectedWidthBreakpoint]}
        theme="light"
        triggerSubMenuAction="click"
      />
    </div>
  )
})
