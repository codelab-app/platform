import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons'
import {
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/application/shared/store'
import { Divider, InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'

export type MenuItemProps = ItemType & {
  hide?: boolean
}

const MenuIconContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className="flex h-full w-5 items-center justify-center"
      style={{ backgroundColor: 'initial' }}
    >
      {children}
    </div>
  )
}

const menuItemCommonStyle = {
  backgroundColor: 'initial',
  blockSize: '100%',
  display: 'flex',
  justifyContent: 'center',
}

export const BuilderSizeMenu = observer(() => {
  const { builderService } = useStore()
  const selectedWidthBreakpoint = builderService.selectedBuilderBreakpoint
  const selectedBuilderWidth = builderService.selectedBuilderWidth

  const handleBreakpointSelected = useCallback(
    (breakpoint: BuilderWidthBreakPoint) => {
      builderService.setSelectedBuilderBreakpoint(breakpoint)
      builderService.setSelectedBuilderWidth(
        defaultBuilderWidthBreakPoints[breakpoint],
      )
    },
    [],
  )

  const menuItems: Array<MenuItemProps> = [
    {
      key: BuilderWidthBreakPoint.MobilePortrait,
      label: (
        <MenuIconContainer>
          <MobileOutlined className="h-full" />
        </MenuIconContainer>
      ),

      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoint.MobilePortrait),
      style: menuItemCommonStyle,
      title: 'Mobile portrait',
    },
    {
      icon: (
        <MenuIconContainer>
          <MobileOutlined rotate={-90} />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoint.MobileLandscape,
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoint.MobileLandscape),
      style: menuItemCommonStyle,
      title: 'Mobile landscape',
    },
    {
      icon: (
        <MenuIconContainer>
          <TabletOutlined />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoint.Tablet,
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoint.Tablet),
      style: menuItemCommonStyle,
      title: 'tablet',
    },
    {
      icon: (
        <MenuIconContainer>
          <DesktopOutlined />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoint.Desktop,
      label: false,
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoint.Desktop),
      style: menuItemCommonStyle,
      title: 'desktop',
    },
  ]

  return (
    <div className="flex h-full flex-row items-center justify-center">
      <Menu
        className="flex justify-center"
        items={menuItems
          .filter((item) => !item.hide)
          .map((item) => ({
            ...item,
            hide: String(item.hide),
          }))}
        mode="horizontal"
        selectable={false}
        selectedKeys={[selectedWidthBreakpoint]}
        style={{
          blockSize: '100%',
        }}
        theme="light"
        triggerSubMenuAction="click"
      />
      <Divider orientation="center" type="vertical" />
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
          value={builderService.selectedBuilderWidth.default}
        />
        <span>px</span>
      </Space>
    </div>
  )
})
