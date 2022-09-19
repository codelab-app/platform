import { IBuilderService } from '@codelab/shared/abstract/core'
import { MenuProps } from 'antd'

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
  // {
  //   label: 'Toolbox',
  //   icon: <AppstoreAddOutlined title="Toolbox" />,
  //   key: BuilderTab.Toolbox,
  //   onClick: () => setActiveBuilderTab(BuilderTab.Toolbox),
  // },
]
