import {
  AppstoreAddOutlined,
  DatabaseOutlined,
  PartitionOutlined,
} from '@ant-design/icons'
import {
  SidebarContainer,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { BuilderTab, IBuilderService } from '@codelab/shared/abstract/core'
import { MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'

type BuilderSidebarNavigationProps = Pick<
  IBuilderService,
  'activeBuilderTab' | 'setActiveBuilderTab'
>

export const BuilderSidebarNavigation = observer<BuilderSidebarNavigationProps>(
  ({ activeBuilderTab, setActiveBuilderTab }) => {
    const items: MenuProps['items'] = [
      {
        label: 'Tree',
        icon: <PartitionOutlined title="Tree" />,
        key: BuilderTab.Tree,
        onClick: () => setActiveBuilderTab(BuilderTab.Tree),
      },
      {
        label: 'Mobx State',
        icon: <DatabaseOutlined title="State" />,
        key: BuilderTab.MobxState,
        onClick: (info) => setActiveBuilderTab(BuilderTab.MobxState),
      },
      {
        label: 'Toolbox',
        icon: <AppstoreAddOutlined title="Toolbox" />,
        key: BuilderTab.Toolbox,
        onClick: () => setActiveBuilderTab(BuilderTab.Toolbox),
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
