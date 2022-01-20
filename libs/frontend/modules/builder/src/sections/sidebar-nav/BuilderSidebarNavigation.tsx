import { AppstoreAddOutlined, PartitionOutlined } from '@ant-design/icons'
import {
  sidebarNavContainerStyle,
  SidebarNavigation,
  SidebarNavigationContainer,
} from '@codelab/frontend/view/templates'
import { Menu } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useBuilderTab } from '../../hooks'
import { BuilderTab } from '../../store'

export const BuilderSidebarNavigation = () => {
  const { builderTab, setBuilderTab } = useBuilderTab()

  return (
    <div
      css={tw`flex flex-col justify-between`}
      style={sidebarNavContainerStyle({ fullHeight: true })}
    >
      <SidebarNavigationContainer
        defaultSelectedKeys={[BuilderTab.Tree]}
        fullHeight={false}
        selectedKeys={[builderTab]}
      >
        <Menu.Item
          icon={<PartitionOutlined title="Tree" />}
          key={BuilderTab.Tree}
          onClick={() => setBuilderTab(BuilderTab.Tree)}
        >
          Tree
        </Menu.Item>
        <Menu.Item
          icon={<AppstoreAddOutlined title="Toolbox" />}
          key={BuilderTab.Toolbox}
          onClick={() => setBuilderTab(BuilderTab.Toolbox)}
        >
          Toolbox
        </Menu.Item>
      </SidebarNavigationContainer>
      <SidebarNavigation />
    </div>
  )
}
