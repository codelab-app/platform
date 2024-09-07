'use client'

import DesktopOutlined from '@ant-design/icons/DesktopOutlined'
import MobileOutlined from '@ant-design/icons/MobileOutlined'
import TabletOutlined from '@ant-design/icons/TabletOutlined'
import { usePreferenceService } from '@codelab/frontend-application-preference/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { IBreakpointType } from '@codelab/shared/abstract/core'
import { Divider, InputNumber, Menu, Space } from 'antd'
import type { ItemType } from 'antd/lib/menu/interface'
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

export const BuilderResizeMenu = () => {
  const { preferenceDomainService } = useDomainStore()
  const preference = preferenceDomainService.preference
  const breakpoint = preference.builderBreakpoint
  const { update } = usePreferenceService()

  const handleBreakpointSelected = useCallback(
    (builderBreakpointType: IBreakpointType) => {
      void update({ builderBreakpointType, id: preference.id })
    },
    [],
  )

  const menuItems: Array<MenuItemProps> = [
    {
      key: IBreakpointType.MobilePortrait,
      label: (
        <MenuIconContainer>
          <MobileOutlined className="h-full" />
        </MenuIconContainer>
      ),

      onClick: () => handleBreakpointSelected(IBreakpointType.MobilePortrait),
      style: menuItemCommonStyle,
      title: 'Mobile portrait',
    },
    {
      icon: (
        <MenuIconContainer>
          <MobileOutlined rotate={-90} />
        </MenuIconContainer>
      ),
      key: IBreakpointType.MobileLandscape,
      onClick: () => handleBreakpointSelected(IBreakpointType.MobileLandscape),
      style: menuItemCommonStyle,
      title: 'Mobile landscape',
    },
    {
      icon: (
        <MenuIconContainer>
          <TabletOutlined />
        </MenuIconContainer>
      ),
      key: IBreakpointType.Tablet,
      onClick: () => handleBreakpointSelected(IBreakpointType.Tablet),
      style: menuItemCommonStyle,
      title: 'tablet',
    },
    {
      icon: (
        <MenuIconContainer>
          <DesktopOutlined />
        </MenuIconContainer>
      ),
      key: IBreakpointType.Desktop,
      label: false,
      onClick: () => handleBreakpointSelected(IBreakpointType.Desktop),
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
        selectedKeys={[preference.builderBreakpointType]}
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
          max={breakpoint.max}
          min={breakpoint.min}
          onChange={(value) =>
            void update({
              builderWidth: Number(value),
              id: preference.id,
            })
          }
          size="small"
          value={breakpoint.default}
        />
        <span>px</span>
      </Space>
    </div>
  )
}
