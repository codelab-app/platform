import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import ApiOutlined from '@ant-design/icons/ApiOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import TagOutlined from '@ant-design/icons/TagOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { RoutePaths } from '@codelab/frontend/abstract/application'

export const adminMenuItems: Array<NavigationBarItem> = [
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: RoutePaths.Atoms(),
    link: {
      href: RoutePaths.Atoms(),
    },
    title: 'Atoms',
  },
  {
    icon: <ApiOutlined title="Types" />,
    key: RoutePaths.Type(),
    link: {
      href: RoutePaths.Type(),
    },
    title: 'Types',
  },
  {
    icon: <TagOutlined title="Tags" />,
    key: RoutePaths.Tags(),
    link: {
      href: RoutePaths.Tags(),
    },
    title: 'Tags',
  },
  {
    icon: <UserOutlined title="Admin" />,
    key: RoutePaths.Admin(),
    link: {
      href: RoutePaths.Admin(),
    },
    title: 'Admin',
  },
]
