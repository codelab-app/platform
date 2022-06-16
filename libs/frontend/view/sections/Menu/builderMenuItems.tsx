import { DatabaseOutlined } from '@ant-design/icons'
import { BuilderTab, IBuilderService } from '@codelab/shared/abstract/core'
import { MenuProps } from 'antd'
import React from 'react'

type BuilderMenuItemProps = Pick<IBuilderService, 'setActiveBuilderTab'>

export const builderMenuItems = (
  props: BuilderMenuItemProps,
): MenuProps['items'] => [
  // {
  //   label: 'Tree',
  //   icon: <PartitionOutlined title="Tree" />,
  //   key: BuilderTab.Tree,
  //   onClick: () => setActiveBuilderTab(BuilderTab.Tree),
  // },
  {
    label: 'Mobx State',
    icon: <DatabaseOutlined title="State" />,
    key: BuilderTab.MobxState,
    onClick: (info) => props.setActiveBuilderTab(BuilderTab.MobxState),
  },
  // {
  //   label: 'Toolbox',
  //   icon: <AppstoreAddOutlined title="Toolbox" />,
  //   key: BuilderTab.Toolbox,
  //   onClick: () => setActiveBuilderTab(BuilderTab.Toolbox),
  // },
]
