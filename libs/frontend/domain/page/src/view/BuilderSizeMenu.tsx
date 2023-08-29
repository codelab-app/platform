import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons'
import {
  BuilderWidthBreakPoint,
  defaultBuilderWidthBreakPoints,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
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
  const breakpoint = builderService.selectedBuilderBreakpoint
  const selectedWidthBreakpoint = defaultBuilderWidthBreakPoints[breakpoint]

  const handleBreakpointSelected = useCallback(
    (newBreakpoint: BuilderWidthBreakPoint) => {
      builderService.setSelectedBuilderBreakpoint(newBreakpoint)
      builderService.setCurrentBuilderWidth(
        defaultBuilderWidthBreakPoints[newBreakpoint],
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
        selectedKeys={[breakpoint]}
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
          max={selectedWidthBreakpoint.max}
          min={selectedWidthBreakpoint.min}
          onChange={(value) =>
            builderService.setCurrentBuilderWidth({
              ...selectedWidthBreakpoint,
              default: Number(value),
            })
          }
          size="small"
          value={selectedWidthBreakpoint.default}
        />
        <span>px</span>
      </Space>
    </div>
  )
})
