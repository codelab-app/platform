import { AppstoreAddOutlined, PartitionOutlined } from '@ant-design/icons'
import {
  sidebarNavContainerStyle,
  SidebarNavigation,
  SidebarNavigationContainer,
} from '@codelab/frontend/view/templates'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { WithBuilderService } from '../../store/BuilderService'
import { BuilderTab } from '../../store/BuilderTab'

export type BuilderSidebarNavigationProps = WithBuilderService

export const BuilderSidebarNavigation = observer<BuilderSidebarNavigationProps>(
  ({ builderService }) => {
    return (
      <div
        css={tw`flex flex-col justify-between`}
        style={sidebarNavContainerStyle({ fullHeight: true })}
      >
        <SidebarNavigationContainer
          defaultSelectedKeys={[BuilderTab.Tree]}
          fullHeight={false}
          selectedKeys={[builderService.builderTab]}
        >
          <Menu.Item
            icon={<PartitionOutlined title="Tree" />}
            key={BuilderTab.Tree}
            onClick={() => builderService.setBuilderTab(BuilderTab.Tree)}
          >
            Tree
          </Menu.Item>
          <Menu.Item
            icon={<AppstoreAddOutlined title="Toolbox" />}
            key={BuilderTab.Toolbox}
            onClick={() => builderService.setBuilderTab(BuilderTab.Toolbox)}
          >
            Toolbox
          </Menu.Item>
        </SidebarNavigationContainer>
        <SidebarNavigation />
      </div>
    )
  },
)
