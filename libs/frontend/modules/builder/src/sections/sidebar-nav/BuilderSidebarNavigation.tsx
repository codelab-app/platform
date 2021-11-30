import { AppstoreAddOutlined, PartitionOutlined } from '@ant-design/icons'
import { useAppState } from '@codelab/frontend/modules/app'
import { usePageState } from '@codelab/frontend/modules/page'
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
  const { currentApp } = useAppState()
  const { currentPage } = usePageState()
  const { builderTab, setBuilderTab } = useBuilderTab()

  return (
    <div
      style={sidebarNavContainerStyle({ fullHeight: true })}
      css={tw`flex flex-col justify-between`}
    >
      <SidebarNavigationContainer
        fullHeight={false}
        defaultSelectedKeys={[BuilderTab.Tree]}
        selectedKeys={[builderTab]}
      >
        <Menu.Item
          onClick={() => setBuilderTab(BuilderTab.Tree)}
          key={BuilderTab.Tree}
          icon={<PartitionOutlined title="Tree" />}
        >
          Tree
        </Menu.Item>
        <Menu.Item
          onClick={() => setBuilderTab(BuilderTab.Toolbox)}
          key={BuilderTab.Toolbox}
          icon={<AppstoreAddOutlined title="Toolbox" />}
        >
          Toolbox
        </Menu.Item>
      </SidebarNavigationContainer>
      <SidebarNavigation />
    </div>
  )
}
