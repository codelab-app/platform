import {
  AppstoreAddOutlined,
  DatabaseOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import { BUILDER_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
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
        onClick: () => builderService.setBuilderTab(BuilderTab.Tree),
      },
      {
        label: 'Mobx State',
        icon: <DatabaseOutlined title="State" />,
        key: BuilderTab.Mobxstate,
        onClick: (info) => builderService.setBuilderTab(BuilderTab.Mobxstate),
      },
      {
        label: 'Toolbox',
        icon: <AppstoreAddOutlined title="Toolbox" />,
        key: BuilderTab.Toolbox,
        onClick: () => builderService.setBuilderTab(BuilderTab.Toolbox),
      },
    ]

    return (
      <div css={tw`flex flex-col justify-between`}>
        <SidebarContainer
          defaultSelectedKeys={[BuilderTab.Tree]}
          fullHeight={false}
          items={items}
          selectedKeys={[builderService.builderTab]}
        />
        <SidebarNavigation />
      </div>
    )
  },
)
