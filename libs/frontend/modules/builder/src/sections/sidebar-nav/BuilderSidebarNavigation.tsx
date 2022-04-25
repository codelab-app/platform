import {
  AppstoreAddOutlined,
  DatabaseOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import {
  sidebarNavContainerStyle,
  SidebarNavigation,
  SidebarNavigationContainer,
} from '@codelab/frontend/view/templates'
import { BuilderTab } from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const BuilderSidebarNavigation = observer<WithServices<BUILDER_SERVICE>>(
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
            icon={<DatabaseOutlined title="State" />}
            key={BuilderTab.MobxState}
            onClick={() => builderService.setBuilderTab(BuilderTab.MobxState)}
          >
            Mobx State
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
