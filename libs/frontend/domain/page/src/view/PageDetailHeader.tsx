import {
  DesktopOutlined,
  EyeOutlined,
  FileOutlined,
  MobileOutlined,
  TabletOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import type {
  IBuilderService,
  IPageService,
} from '@codelab/frontend/abstract/core'
import {
  BuilderWidthBreakPoints,
  defaultBuilderWidthBreakPoints,
} from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentAppId,
  useCurrentPageId,
} from '@codelab/frontend/presenter/container'
import { InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { useAsync } from 'react-use'
import tw from 'twin.macro'
// import { BuilderSizeBreakpoints, mainContentWidthBreakPoint } from './constants'

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

  const { loading } = useAsync(
    () => pageService.getAll({ app: { id: currentAppId } }),
    [currentAppId],
  )

  const pagesList = pageService.pagesByApp(currentAppId)
  const currentPage = pagesList.find((x) => x.id === pageId)
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
      builderService?.setSelectedBuilderWidth(
        defaultBuilderWidthBreakPoints[breakpoint],
      )
    },
    [],
  )

  const menuItems: Array<MenuItemProps> = [
    {
      label: <FileOutlined />,
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
      label: isBuilder ? <EyeOutlined /> : <ToolOutlined />,
      key: '1',
      title: isBuilder ? 'Preview' : 'Builder',
      onClick: switchPreviewMode,
      style: { backgroundColor: 'initial' },
      hide: false,
    },
    {
      label: <MobileOutlined />,
      key: BuilderWidthBreakPoints.Mobile,
      title: 'mobile',
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Mobile),
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      label: <MobileOutlined rotate={-90} />,
      key: BuilderWidthBreakPoints.MobileVertical,
      title: 'mobile vertical',
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.MobileVertical),
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      label: <TabletOutlined />,
      key: BuilderWidthBreakPoints.TabletHorizontal,
      title: 'tablet horizontal',
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.TabletHorizontal),
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      label: <DesktopOutlined />,
      key: BuilderWidthBreakPoints.Desktop,
      title: 'desktop',
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Desktop),
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
    {
      label: (
        <Space direction="horizontal" size="small">
          <InputNumber
            controls={false}
            max={builderService?.selectedBuilderWidth.max}
            min={builderService?.selectedBuilderWidth.min}
            onChange={(value) =>
              builderService?.setSelectedBuilderWidth({
                ...builderService.selectedBuilderWidth,
                default: Number(value),
              })
            }
            size="small"
            value={builderService?.currentBuilderWidth.default ?? ''}
          />
          <span>px</span>
        </Space>
      ),
      key: 'custom',
      title: 'custom size',
      style: { backgroundColor: 'initial' },
      hide: !isBuilder,
    },
  ]

  return (
    <Menu
      css={tw`flex justify-center`}
      items={menuItems
        .filter((x) => !x.hide)
        .map((x) => ({
          ...x,
          hide: String(x.hide),
        }))}
      mode="horizontal"
      selectable={false}
      selectedKeys={[selectedWidthBreakpoint]}
      theme="light"
      triggerSubMenuAction="click"
    />
  )
})
