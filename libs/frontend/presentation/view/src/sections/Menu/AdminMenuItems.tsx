import type { NavigationBarItem } from '@codelab/frontend-presentation-codelab-ui'

import ApiOutlined from '@ant-design/icons/ApiOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'

export const adminMenuItems: Array<NavigationBarItem> = [
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: RoutePaths.Atom.base(),
    link: {
      href: RoutePaths.Atom.base(),
    },
    title: 'Atoms',
  },
  {
    icon: <ApiOutlined title="Types" />,
    key: RoutePaths.Type.base(),
    link: {
      href: RoutePaths.Type.base(),
    },
    title: 'Types',
  },
  // {
  //   icon: <TagOutlined title="Tags" />,
  //   key: RoutePaths.Tag.base(),
  //   link: {
  //     href: RoutePaths.Tag.base(),
  //   },
  //   title: 'Tags',
  // },
  {
    icon: <UserOutlined title="Admin" />,
    key: RoutePaths.Admin.base(),
    link: {
      href: RoutePaths.Admin.base(),
    },
    title: 'Admin',
  },
]
