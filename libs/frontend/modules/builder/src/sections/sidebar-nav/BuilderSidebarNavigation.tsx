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
import { BuilderTab, IBuilderService } from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

type BuilderSidebarNavigationProps = Pick<
  IBuilderService,
  'setBuilderTab' | 'builderTab'
>

export const BuilderSidebarNavigation = observer<BuilderSidebarNavigationProps>(
  ({ setBuilderTab, builderTab }) => {
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
            icon={<DatabaseOutlined title="State" />}
            key={BuilderTab.MobxState}
            onClick={() => setBuilderTab(BuilderTab.MobxState)}
          >
            Mobx State
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
  },
)
