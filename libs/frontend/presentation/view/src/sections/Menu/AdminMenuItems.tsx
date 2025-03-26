import type { NavigationBarItem } from '@codelab/frontend/presentation/codelab-ui'

import ApiOutlined from '@ant-design/icons/ApiOutlined'
import DeploymentUnitOutlined from '@ant-design/icons/DeploymentUnitOutlined'
import TagOutlined from '@ant-design/icons/TagOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { NewRoutePaths } from '@codelab/frontend/abstract/application'

export const adminMenuItems: Array<NavigationBarItem> = [
  {
    icon: (
      <DeploymentUnitOutlined data-testid="atom-tab-trigger" title="Atoms" />
    ),
    key: NewRoutePaths.Atom.base(),
    link: {
      href: NewRoutePaths.Atom.base(),
    },
    title: 'Atoms',
  },
  {
    icon: <ApiOutlined title="Types" />,
    key: NewRoutePaths.Type.base(),
    link: {
      href: NewRoutePaths.Type.base(),
    },
    title: 'Types',
  },
  {
    icon: <TagOutlined title="Tags" />,
    key: NewRoutePaths.Tag.base(),
    link: {
      href: NewRoutePaths.Tag.base(),
    },
    title: 'Tags',
  },
  {
    icon: <UserOutlined title="Admin" />,
    key: NewRoutePaths.Admin.base(),
    link: {
      href: NewRoutePaths.Admin.base(),
    },
    title: 'Admin',
  },
]
