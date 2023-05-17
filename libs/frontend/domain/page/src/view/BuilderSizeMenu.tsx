import {
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons'
import {
  BuilderWidthBreakPoints,
  defaultBuilderWidthBreakPoints,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Divider, InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/hooks/useItems'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import tw from 'twin.macro'

export type MenuItemProps = ItemType & {
  hide?: boolean
}

const MenuIconContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      css={tw`h-full w-5 flex items-center justify-center`}
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
      key: BuilderWidthBreakPoints.Mobile,
      label: (
        <MenuIconContainer>
          <MobileOutlined css={tw`h-full`} />
        </MenuIconContainer>
      ),

      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Mobile),
      style: menuItemCommonStyle,
      title: 'mobile',
    },
    {
      icon: (
        <MenuIconContainer>
          <MobileOutlined rotate={-90} />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoints.MobileVertical,
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.MobileVertical),
      style: menuItemCommonStyle,
      title: 'mobile vertical',
    },
    {
      icon: (
        <MenuIconContainer>
          <TabletOutlined />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoints.TabletHorizontal,
      onClick: () =>
        handleBreakpointSelected(BuilderWidthBreakPoints.TabletHorizontal),
      style: menuItemCommonStyle,
      title: 'tablet horizontal',
    },
    {
      icon: (
        <MenuIconContainer>
          <DesktopOutlined />
        </MenuIconContainer>
      ),
      key: BuilderWidthBreakPoints.Desktop,
      label: false,
      onClick: () => handleBreakpointSelected(BuilderWidthBreakPoints.Desktop),
      style: menuItemCommonStyle,
      title: 'desktop',
    },
  ]

  return (
    <div css={tw`h-full flex flex-row items-center justify-center`}>
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
          value={builderService.currentBuilderWidth.default}
        />
        <span>px</span>
      </Space>
    </div>
  )
})
