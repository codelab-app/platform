import {
  AppstoreAddOutlined,
  DatabaseOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import {
  SidebarContainer,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { BuilderTab } from '@codelab/shared/abstract/core'
import { MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

export const BuilderSidebarNavigation = observer<WithServices<BUILDER_SERVICE>>(
  ({ builderService }) => {
    const items: MenuProps['items'] = [
      {
        label: 'Tree',
        icon: <PartitionOutlined title="Tree" />,
        key: BuilderTab.Tree,
        onClick: () => builderService.setActiveBuilderTab(BuilderTab.Tree),
      },
      {
        label: 'Mobx State',
        icon: <DatabaseOutlined title="State" />,
        key: BuilderTab.MobxState,
        onClick: (info) => builderService.setActiveBuilderTab(BuilderTab.MobxState),
      },
      {
        label: 'Toolbox',
        icon: <AppstoreAddOutlined title="Toolbox" />,
        key: BuilderTab.Toolbox,
        onClick: () => builderService.setActiveBuilderTab(BuilderTab.Toolbox),
      },
    ]

    return (
      <div css={tw`flex flex-col justify-between`}>
        <SidebarContainer
          defaultSelectedKeys={[BuilderTab.Tree]}
          fullHeight={false}
          items={items}
          selectedKeys={[activeBuilderTab]}
        />
        <SidebarNavigation />
      </div>
    )
  },
)
