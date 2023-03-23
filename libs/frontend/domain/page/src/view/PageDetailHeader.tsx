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
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useAsync } from '@react-hookz/web'
import { InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import tw from 'twin.macro'

export type MenuItemProps = ItemType & {
  hide?: boolean
}

export const PageDetailHeader = observer(() => {
  const { builderService, pageService } = useStore()
  const router = useRouter()
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  const getPages = useAsync(() =>
    pageService.getAll({ appConnection: { node: { id: appId } } }),
  )[1]

  useEffect(() => {
    void getPages.execute()
  }, [appId])

  const pagesList = pageService.pagesByApp(appId)
  const currentPage = pagesList.find((page) => page.id === pageId)
  const isBuilder = router.pathname === PageType.PageBuilder

  const switchPreviewMode = () => {
    return router.push({
      pathname: isBuilder ? PageType.PageDetail : PageType.PageBuilder,
      query: router.query,
    })
  }

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
              query: { ...router.query, pageId: page.id },
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
  )
})
